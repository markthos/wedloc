const { User, Message, Capsule } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

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
    }
};

module.exports = resolvers