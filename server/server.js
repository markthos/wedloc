require('dotenv').config(); // dotenv setup to configure environment variables
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const http = require('http'); // http for socket.io
const socketIo = require('socket.io'); // Import Socket.IO

const { v2: cloud } = require('cloudinary'); // Cloudinary setup
          

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Cloud setup 
cloud.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const startApolloServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
  })
  };
  
  startApolloServer();

// Socket.IO server logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send a message to all connected clients
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    io.emit('messageReceived', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

 