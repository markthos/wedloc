const { User, Message } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        getMessages: async () => {
            return await Message.find({});
        }, 
    },
    Mutation: {
        // Add a message to the database without being logged in
        addMessage: async (parent, { text }) => {
            const message = await Message.create({
                text,
            });
            return message;
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
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
            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers