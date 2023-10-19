const { User, Capsule, Post, Payment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const cloudinary = require("cloudinary").v2;
const { signToken } = require("../utils/auth");
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
    getUserCapsules: async (parent, args, context) => {
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

    getUserPic: async (parent, args, context) => {
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

      console.log("Post Found");

      return post;
    },
    getCreditCard: async (_, { _id }) => {
      return await CreditCard.findById(_id);
    },
    getUserCreditCards: async (_, __, context) => {
        if (context.user) {
            return await CreditCard.find({ user: context.user._id });
        }
        throw new AuthenticationError("Authentication error");
    },
  },
  Mutation: {
    // Create a capsule with a title and date by a logged in user
    createCapsule: async (
      parent,
      { title, date, location, eventPic },
      context
    ) => {
      if (context.user) {
        console.log("context.user", context.user);
        const capsule = await Capsule.create({
          title,
          date,
          location,
          eventPic,
          owner: context.user.username,
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

    updateCapsule: async (
      parent,
      { capsuleId, title, location, eventPic },
      context
    ) => {
      if (context.user) {
        console.log("context.user", context.user);
        const capsule = await Capsule.findOneAndUpdate(
          { _id: capsuleId },
          { title, location, eventPic },
          { new: true }
        );
        return capsule;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    deleteCapsule: async (parent, { capsuleId }, context) => {
      if (context.user) {
        const capsule = await Capsule.findById(capsuleId);

        if (!capsule) {
          throw new Error("Capsule not found");
        }
        if (capsule.owner !== context.user.username) {
          throw new AuthenticationError(
            "You don't have permissions to delete this capsule"
          );
        }

        await Capsule.findOneAndDelete({ _id: capsuleId });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { capsules: capsuleId } }
        );
      }
    },

    devDelCapsule: async (parent, { capsuleId }) => {
      try {
        const capsule = await Capsule.findOneAndDelete({
          _id: capsuleId,
        });
        if (!capsule) {
          throw new Error("Capsule not found");
        }

        console.log("Capsule deleted", capsule);
        return { success: true, message: "Capsule deleted successfully" };
      } catch (error) {
        console.error("Error deleting capsule", error);
        return { success: false, message: "Error deleting capsule" };
      }
    },

    // Add a post to a capsule by a logged in user
    uploadPost: async (parent, { capsuleId, url, owner }) => {
      const newPost = {
        url,
        owner,
      };

      const updatedCapsule = await Capsule.findOneAndUpdate(
        { _id: capsuleId },
        { $push: { posts: newPost } },
        { new: true }
      );

      if (!updatedCapsule) {
        console.log("capsule not found");
        return null; // Handle this as needed
      }

      console.log("New Post Added");

      return updatedCapsule.posts[updatedCapsule.posts.length - 1];
    },

    deletePost: async (parent, { capsuleId, postId }, context) => {
      if (context.user) {
        const capsule = await Capsule.findById(capsuleId);

        if (!capsule) {
          throw new Error("Capsule not found");
        }
        if (capsule.owner !== context.user.username) {
          throw new AuthenticationError(
            "You don't have permissions to delete this capsule"
          );
        }


        console.log(postId)

        const updated = await Capsule.findOneAndUpdate(
          { _id: capsuleId },
          { $pull: { posts: { _id: postId } } },
          { new: true }
        );

        if (!updated) {
          throw new Error("Post not found in the capsule or unable to remove it.");
        }
        
        console.log(updated)

        return updated;
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
      { firstName, lastName, username, email, profilePic },
      context) => {
        if (context.user){
          const contextUserId = context.user._id;

          const updatedUser = await User.findOneAndUpdate(
            { _id: contextUserId },
            { firstName, lastName, username, email, profilePic },
            { new: true }
        );
        return  updatedUser ;
      } else {
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

      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
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
    addCreditCard: async (_, { cardNumber, expiryDate, CVV, cardHolderName }, context) => {
      if (context.user) {
          const creditCard = await CreditCard.create({
              cardNumber,
              expiryDate,
              CVV,
              cardHolderName,
              user: context.user._id
          });
          await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { creditCards: creditCard._id } }
          );
          return creditCard;
      }
      throw new AuthenticationError("Authentication error");
  },
  deleteCreditCard: async (_, { _id }, context) => {
      if (context.user) {
          const creditCard = await CreditCard.findOneAndDelete({ _id, user: context.user._id });
          if (creditCard) {
              await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { creditCards: creditCard._id } }
              );
              return creditCard;
          }
          throw new Error("Credit card not found");
      }
      throw new AuthenticationError("Authentication error");
  },
  updateCreditCard: async (_, { _id, cardNumber, expiryDate, CVV, cardHolderName }, context) => {
      if (context.user) {
          return await CreditCard.findOneAndUpdate(
              { _id, user: context.user._id },
              { cardNumber, expiryDate, CVV, cardHolderName },
              { new: true }
          );
      }
      throw new AuthenticationError("Authentication error");
  },

    upVote: async (parent, { capsuleId, postId }) => {
      const capsuleIdObject = new ObjectId(capsuleId);
      const postIdObject = new ObjectId(postId);

      const cap = await Capsule.findOneAndUpdate(
        { _id: capsuleIdObject, "posts._id": postIdObject },
        { $inc: { "posts.$.upVotes": 1 } },
        { new: true }
      );

      if (!cap) {
        console.log("post not found");
        return null;
      }

      const upvotes = await cap.posts.find((post) =>
        post._id.equals(postIdObject)
      );
      // cap now contains the updated document
      console.log("post found: upvote: " + upvotes.upVotes);

      return upvotes;
    },

    downVote: async (parent, { capsuleId, postId }) => {
      const capsuleIdObject = new ObjectId(capsuleId);
      const postIdObject = new ObjectId(postId);

      const cap = await Capsule.findOneAndUpdate(
        { _id: capsuleIdObject, "posts._id": postIdObject },
        { $inc: { "posts.$.upVotes": -1 } },
        { new: true }
      );

      if (!cap) {
        console.log("post not found");
        return null;
      }

      const downVotes = await cap.posts.find((post) =>
        post._id.equals(postIdObject)
      );
      // cap now contains the updated document
      console.log("post found: downvote: " + downVotes.upVotes);

      return downVotes;
    },

    addComment: async (parent, { capsuleId, postId, text, author }) => {
      const postIdObject = new ObjectId(postId);

      const newComment = {
        text,
        author,
      };

      const updatedPost = await Capsule.findOneAndUpdate(
        { _id: capsuleId, "posts._id": postIdObject },
        { $push: { "posts.$.comments": newComment } },
        { new: true }
      );

      if (!updatedPost) {
        console.log("post not found");
        return null; // Handle this as needed
      }

      const post = updatedPost.posts.find((post) =>
        post._id.equals(postIdObject)
      );

      console.log("New Comment Added");

      return post;
    },
  },
};

module.exports = resolvers;
