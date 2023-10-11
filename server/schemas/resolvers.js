const { User, LiveChat, Capsule, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { signToken, authMiddleware } = require("../utils/auth");
require("dotenv").config();
const bcrypt = require('bcryptjs');


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
    getChat: async () => {
      return await LiveChat.find({});
    },
    // for dev use
    getUsers: async () => {
      return await User.find({});
    },
    users: async () => {
      return User.find({});
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Add a post to a capsule by a logged in user
    addPost: async (parent, { capsuleId, text }, context) => {
      if (context.user) {
        const post = await Post.create({
          text,
          capsuleId,
          user: context.user._id,
        });
        await Capsule.findOneAndUpdate(
          { _id: capsuleId },
          { $addToSet: { posts: post._id } }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addChat: async (parent, { text, author }, context) => {
      const newLiveChat = await Capsule.findOneAndUpdate(
        { _id: context.capsuleId },
        { $addToSet: { chat: { text, author } } },
        { new: true }
      );

      return newLiveChat;
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
          password: hashedPassword
        });
        const token = signToken(user);
        return {user, token};
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },    
    deleteUser: async (parent, { userId }) => {
      const user = await User.findOneAndDelete({ _id: userId });
      console.log("user deleted", user);
    },
    login: async (parent, { username, password }) => {
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
      console.log("token", token);
      return user;
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
