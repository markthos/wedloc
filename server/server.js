require("dotenv").config(); // dotenv setup to configure environment variables
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const http = require("http"); // http for socket.io
const socketIo = require("socket.io"); // Import Socket.IO
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Updated to use dotenv


const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This is for parsing the body of POST requests, which we will use when the client sends the token to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Stripe payment route
app.post("/api/payment", async (req, res) => {
  try {
    const { token } = req.body;

    const charge = await stripe.charges.create({
      amount: 999, // Amount in cents. Adjust accordingly
      currency: "usd",
      description: "Example charge",
      source: token,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


const startApolloServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  });
};

startApolloServer();


io.on("connection", (socket) => {
  console.log("A user connected");

  // When a user joins an event room
  socket.on("joinEventRoom", (eventRoom) => {
    console.log("A user joined event room", eventRoom);
    socket.join(eventRoom);
  });

  // Send a message to a specific event room
  socket.on("sendMessageToEventRoom", (eventRoom, message) => {
    console.log("Received message:", message);
    io.to(eventRoom).emit("messageReceived", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


