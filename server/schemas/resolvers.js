const { User, Message, Capsule } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { createWriteStream } = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const resolvers = {
    Query: {
        // Get capsule by id
        GetCapsule: async (parent, { _id }) => {
            return await Capsule.findOne({ _id }).populate('posts');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        GetMessages: async () => {
            return await Message.find({});
        }, 
    },
    Mutation: {
        // Create a capsule with a title and date by a logged in user
        createCapsule: async (parent, { title, date }, context) => {
            if (context.user) {
                const capsule = await Capsule.create({
                    title,
                    date,
                    user: context.user._id,
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { capsules: capsule._id } }
                );
                return capsule;
            }
            throw new AuthenticationError('You need to be logged in!');
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
            throw new AuthenticationError('You need to be logged in!');
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
            throw new AuthenticationError('You need to be logged in!');
        },
        // Add a message to the database without being logged in
        AddMessage: async (parent, { text }) => {
            const message = await Message.create({
                text,
            });
            return message;
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            // const token = signToken(user);
            return { user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // const token = signToken(user);
            return { user };
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
    }
};

module.exports = resolvers