const jwt = require('jsonwebtoken');
const expiration = '2h';
require('dotenv').config();

module.exports = {
    authMiddleware: function ({ req }) {
        console.log('we hit authMiddleware')
        let token = req.query.token || req.body.token || req.headers.authorization;
        console.log(token)
      
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
      
        if (!token) {
          throw new Error('You have no token!');
        }
      
        try {
          const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
          return { user: data };
        } catch {
          throw new Error('Invalid token');
        }
    },

    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        try {
          return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: expiration });
      } catch (error) {
          console.error("Error signing the token:", error);
          throw error;
      }
    },
};