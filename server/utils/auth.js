const jwt = require('jsonwebtoken');
const expiration = '2h';

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
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          return { user: data };
        } catch {
          throw new Error('Invalid token');
        }
      },
      signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      },
    };