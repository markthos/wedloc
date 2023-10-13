const { User, Capsule, Post, Payment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
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
    getCapsulesDev: async () => {
      return await Capsule.find({});
    },
    getCapsules: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "capsules"
        );
        return user.capsules;
      }
      throw new AuthenticationError("Authentication error");
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

      console.log("post found");

      return post;
    },
  },
  Mutation: {
    //!! ADD ATTENDEES  and req.session.name saved (maybe token and not session)

    // Create a capsule with a title and date by a logged in user
    createCapsule: async (parent, { title, date, location }, context) => {
      if (context.user) {
        console.log("context.user", context.user);
        const capsule = await Capsule.create({
          title,
          date,
          location,
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
    uploadPost: async (parent, { file }) => {
      try {
        console.log("uploading post...", file);
        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file, {
          folder: "wedloc", // Specify the folder in Cloudinary
        });

        console.log("uploadResult", uploadResult);
        // Return the result of the Cloudinary upload
        return {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };
      } catch (error) {
        throw new Error("Error uploading image: " + error.message);
      }
    },
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

    addUser: async (
      parent,
      { username, email, password, firstName, lastName }
    ) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          firstName,
          lastName,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        // Handle the error here, e.g., log it or return an error message.
        throw new Error("An error occurred while creating a user.");
      }
    },

    updateUser: async (
      parent,
      { firstName, lastName, email, profilePic },
      context
    ) => {
      const contextUserId = context.user._id;
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: contextUserId },
          { firstName, lastName, email, profilePic },
          { new: true }
        );
        console.log("updatedUser", updatedUser);
        console.log("contextUserId", contextUserId);
        return { updatedUser };
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (parent, { username }, context) => {
      const contextUserId = context.user._id;
      try {
        const deletedUser = await User.findOneAndDelete({ _id: contextUserId });
        console.log("deletedUser", deletedUser);
        console.log("contextUserId", contextUserId);
        return { deletedUser };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Error deleting user");
      }
    },

    devDelUser: async (parent, { userId }) => {
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

    addPayment: async (
      _,
      { userId, chargeId, amount, currency, description }
    ) => {
      try {
        const payment = new Payment({
          userId,
          chargeId,
          amount,
          currency,
          description,
        });
        await payment.save();
        return payment;
      } catch (err) {
        throw new Error(err);
      }
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

    upVote: async (parent, { capsuleId, postId }) => {
      const capsuleIdObject = new ObjectId(capsuleId);
      const postIdObject = new ObjectId(postId);

      const updatedPost = await Capsule.findOneAndUpdate(
        { _id: capsuleIdObject, "posts._id": postIdObject },
        { $inc: { "posts.$.upVotes": 1 } },
        { new: true }
      );

      if (!updatedPost) {
        console.log("post not found");
        return 0;
      }

      const results = updatedPost.posts.find((post) =>
        post._id.equals(postIdObject)
      );
      console.log("post found: " + results.upVotes);

      return results.upVotes;
    },

    downVote: async (parent, { capsuleId, postId }) => {
      const capsule = await Capsule.findById({ _id: capsuleId });

      const postIdObject = new ObjectId(postId);
      const post = capsule.posts.find((post) => post._id.equals(postIdObject));
      if (!post) {
        console.log("post not found");
        return null;
      }

      console.log("post found");

      const upVote = post.upVotes + 1;

      const updatedPost = await Capsule.findOneAndUpdate(
        { _id: capsuleId, "posts._id": postIdObject },
        { $set: { "posts.$.downVotes": upVote } },
        { new: true }
      );

      return updatedPost;
    },

    addComment: async (parent, { capsuleId, postId, text, author }) => {
      const capsule = await Capsule.findById({ _id: capsuleId });

      const postIdObject = new ObjectId(postId);
      const post = capsule.posts.find((post) => post._id.equals(postIdObject));
      if (!post) {
        console.log("post not found");
        return null;
      }

      console.log("post found");

      const newComment = {
        text,
        author,
      };

      const updatedPost = await Capsule.findOneAndUpdate(
        { _id: capsuleId, "posts._id": postIdObject },
        { $push: { "posts.$.comments": newComment } },
        { new: true }
      );

      return updatedPost;
    },
  },
};

module.exports = resolvers;
