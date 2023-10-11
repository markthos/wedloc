const { User, LiveChat, Capsule, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { signToken, authMiddleware } = require("../utils/auth");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const bcrypt = require("bcryptjs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resolvers = {
  Query: {
    // Get capsule by id
    getCapsule: async (parent, { _id }) => {
      return await Capsule.findOne({ _id });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Authentication error");
    },
    getChat: async (parent, { capsuleId }) => {
      const capsule = await Capsule.findById({ _id: capsuleId });

      const capsuleChat = capsule.chat;
      return capsuleChat;
    },
    // for dev use
    getUsers: async () => {
      return await User.find({});
    },
    getPost: async (parent, { capsuleId, postId }) => {
      const capsule = await Capsule.findById({ _id: capsuleId });

      const postIdObject = new ObjectId(postId);
      const post = capsule.posts.find((post) => post._id.equals(postIdObject));
      if (!post) {
        console.log("post not found");
        return null; // Post not found
      }

      console.log("post found", post);

      return post;
    },
  },
  Mutation: {
    //!! ADD ATTENDEES  and req.session.name saved (maybe token and not session)

    // Create a capsule with a title and date by a logged in user
    createCapsule: async (parent, { title, date }, context) => {
      if (context.user) {
        const capsule = await Capsule.create({
          title,
          date,
          owner: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { capsules: capsule._id } }
        );
        return capsule;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    // Add a post to a capsule by a logged in user
    addPost: async (parent, { capsuleId }) => {
      await Capsule.findOneAndUpdate(
        { _id: capsuleId },
        { $addToSet: { posts: post._id } }
      );
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { posts: post._id } }
      );
      return post;
    },
    // Delete a post by a logged in user
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          user: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Add a Live to the database without being logged in
    addChat: async (parent, { text, author, capsuleId }) => {
      console.log("adding chat...", text, author, capsuleId);

      const newLiveChat = await Capsule.findOneAndUpdate(
        { _id: capsuleId },
        { $addToSet: { chat: { text, author } } },
        { new: true }
      );

      const newChat = newLiveChat.chat[newLiveChat.chat.length - 1];

      console.log("newLiveChat", newChat);

      return newChat;
    },
    // add a user to the database and login with token
    // addUser: async (parent, { username, email, password }) => {
    //   try {
    //     const user = await User.create({
    //       username,
    //       email,
    //       password,
    //     });
    //     const token = signToken(user);
    //     return { token, user };
    //   } catch (error) {
    //     console.error("Error creating user:", error);
    //     throw new Error("Failed to create user");
    //   }
    // },
    addUser: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
        const token = signToken(user);
        return { user, token };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
      }
    },
    deleteUser: async (parent, { userId }) => {
      const user = await User.findOneAndDelete({ _id: userId });
      console.log("user deleted", user);
    },
    login: async (parent, { username, password }) => {
      console.log("hit login");
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log("user found", user);
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      console.log(token, user);
      return { token, user };
    },
    uploadFile: async (_, { file }) => {
      try {
        const { createReadStream, filename, mimetype } = await file;

        // Convert Buffer to Stream
        const fileStream = createReadStream();

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          fileStream.pipe(cloudStream);
        });

        // Return metadata and URL
        return {
          filename,
          mimetype,
          encoding: "base64",
          url: result.secure_url,
        };
      } catch (error) {
        throw new Error(`Failed to upload file: ${error}`);
      }
    },
  },
};

module.exports = resolvers;
