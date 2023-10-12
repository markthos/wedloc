// Live Chat Page

//!!! EVERYTHING IS WORKING EXCEPT DATE
//TODO DATE

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

const borderRadius = {
  borderBottomLeftRadius: "15px" /* Adjust the value as needed */,
  borderTopRightRadius: "15px",
  padding: "3px",
  paddingLeft: "10px",
  paddingRight: "10px",
};

//* This is the LiveChat component
export default function LiveChat() {
  // Get the event ID from the URL
  const { eventId } = useParams();
  const [name, setName] = useState(localStorage.getItem("name") || "anonymous");

  // set up state for chat data and set default author to local storage name
  const [chatData, setChatData] = useState({
    capsuleId: eventId,
    text: "",
    author: localStorage.getItem("name") || "anonymous", // grab local storage name as default
  });

  // Query the database for the chat history
  const { loading, data } = useQuery(GET_CHAT, {
    variables: { id: eventId },
  });

  // check if there is chat history
  const chatHistory = data?.getCapsule || [];
  // const dateSorted = chatHistory.chat.sort((a, b) => a.date - b.date );

  // Function to scroll to the bottom of the chat history div

  // Create a new message via GraphQL mutation and set createMessage to a function
  const [createMessage, { error }] = useMutation(ADD_CHAT, {
    variables: {
      capsuleId: chatData.capsuleId,
      text: chatData.text,
      author: chatData.author,
    },
  });

  const scrollToBottom = () => {
    const chatBox = document.querySelector(".no-scrollbar");
    if (chatBox) {
      chatBox.style.scrollBehavior = "smooth"; // Enable smooth scrolling
      chatBox.scrollTop = chatBox.scrollHeight;
      chatBox.style.scrollBehavior = "auto"; // Reset to default behavior
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Listen for new messages from Socket.IO and set them immediately to the chat list
  useEffect(() => {
    socket.on("messageReceived", (message) => {
      // Handle the new message received from the server
      console.log("Received message from Socket.IO:", message);
      const messages = document.getElementById("messages");
      const item = document.createElement("li");
      item.innerHTML = `
        <div class="flex gap-3 justify-between">
          <h3>${message.author}</h3>
          <p>${dayjs(message.date)}</p>
        </div>
        <div class="flex justify-end bg-white font-extrabold">
          <p>${message.text}</p>
        </div>`;
      messages.appendChild(item);

      scrollToBottom();

      setChatData({
        ...chatData,
        text: "",
      });
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  // if loading, return a loading spinner
  if (loading)
    return (
      <div className="max-h-100 flex flex-col items-center justify-center overflow-scroll">
        <Orbit size={200} color="white" />
      </div>
    );

  // if no chathistory, return a message
  if (!chatHistory)
    return (
      <div className="max-h-100 flex flex-col items-center justify-center overflow-scroll">
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
    <div className=" bg-main_bg">
      <section className="container m-auto">
        <h1 className="text-center font-extrabold">Live Chat</h1>
        <div
          className="no-scrollbar flex flex-col items-center justify-center overflow-scroll p-6"
          style={{ height: "70vh" }}
        >
          <ul id="messages">
            {/* map over the chat history and display the messages */}
            {chatHistory.chat.map((message) => (
              <li key={message._id}>
                <div className="flex justify-between gap-3">
                  <h3>{message.author}</h3>
                  <p>{dayjs(message.date).format("MM-DD HH:mm")}</p>
                </div>
                {message.author === name ? (
                  <div
                    className="flex justify-end bg-white font-extrabold"
                    style={borderRadius}
                  >
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <div
                    className="flex flex-col bg-white font-extrabold"
                    style={borderRadius}
                  >
                    <p>{message.text}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <form className="m-6 flex flex-col">
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
          <button
            type="submit"
            onClick={handleSendMessage}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
