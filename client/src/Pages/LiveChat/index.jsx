import { useQuery, useMutation } from "@apollo/client";
import io from "socket.io-client";
import { GET_CHAT } from "../../utils/queries";
import { ADD_CHAT } from "../../utils/mutations";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Orbit } from "@uiball/loaders";
import dayjs from "dayjs";

// Create a Socket.IO client instance
const socket = io("http://localhost:3000"); // Change the URL to match your Socket.IO server URL

//! Temporary styles for the loading spinner
const styleADiv = {
  maxHeight: "700px",
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E4DDD3",
};

//! temp style for chat
const styleAChat = {
  display: "flex",
  gap: "20px",
};

//! temp style for chat text
const styleAChatText = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  fontWeight: "bolder",
};


//* This is the LiveChat component
export default function LiveChat() {

  // Get the event ID from the URL
  const { eventId } = useParams();

// set up state for chat data and set default author to local storage name
  const [chatData, setChatData] = useState({
    capsuleId: eventId,
    text: "",
    author: localStorage.getItem("name"), // grab local storage name as default
  });

  // Query the database for the chat history
  const { loading, data } = useQuery(GET_CHAT, {
    variables: { id: eventId },
  });

  // check if there is chat history
  const chatHistory = data?.getCapsule || [];
  // const dateSorted = chatHistory.chat.sort((a, b) => a.date - b.date );

  // Create a new message via GraphQL mutation and set createMessage to a function
  const [createMessage, { error }] = useMutation(ADD_CHAT, {
    variables: {
      capsuleId: chatData.capsuleId,
      text: chatData.text,
      author: chatData.author,
    },
  });

  // Listen for new messages from Socket.IO and set them immediately to the chat list
  useEffect(() => {
    socket.on("messageReceived", (message) => {
      // Handle the new message received from the server
      console.log("Received message from Socket.IO:", message);
      const messages = document.getElementById("messages");
      const item = document.createElement("li");
      item.textContent = message.text; //TODO add author and date
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight; //TODO scroll to the bottom is not working
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  // if loading, return a loading spinner
  if (loading)
    return (
      <div style={styleADiv}>
        <Orbit size={200} color="white" />
      </div>
    );

  // if no chathistory, return a message
  if (!chatHistory)
    return (
      <div style={styleADiv}>
        <p>No chat found</p>
      </div>
    );

    // handle the sending of a message on submit
  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      // check the console for the data
      console.log("Sending message:", chatData);
      // // Send a new message via GraphQL mutation

      // Emit the same message to the Socket.IO server immediately
      socket.emit("sendMessage", chatData);

      // use the mutation function toe create a new message on the server
      const newMessage = await createMessage({
        variables: {
          capsuleId: chatData.capsuleId,
          text: chatData.text,
          author: chatData.author,
        },
      });

      // reset the state after the message created and clear the form
      setChatData({
        ...chatData,
        text: "",
      });

      
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


// return the chat history and the form to send a message
  return (
    <div className="body">
      <section className="contentSection">
        <h1>Live Chat</h1>
        <div style={styleADiv}>
          <ul id="messages">
          {/* map over the chat history and display the messages */}
            {chatHistory.chat.map((message) => (
              <div key={message._id}>
                <div style={styleAChat}>
                  <h3>{message.author}</h3>
                  <p>{dayjs(message.date).format("MM-DD HH:mm")}</p>
                </div>
                <div style={styleAChatText}>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>

        <form>
          <input
            type="text"
            value={chatData.text}
            onChange={(e) =>
              setChatData(() => ({
                ...chatData,
                text: e.target.value,
              }))
            }
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </form>
      </section>
    </div>
  );
}
