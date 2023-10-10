import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "react-session"
import io from "socket.io-client";
import { GET_CHAT } from "../../utils/queries";
import { ADD_CHAT } from "../../utils/mutations";
import { useState, useEffect } from "react";

//!! playing with this code but need apollo server to be running

// Create a Socket.IO client instance
const socket = io("http://localhost:3000"); // Change the URL to match your Socket.IO server URL

export default function LiveChat() {
  const [chatData, setChatData] = useState({
    text: "",
    author: "",
  });
  const { loading, data } = useQuery(GET_CHAT);
  const [addChat] = useMutation(ADD_CHAT);

  // Listen for new messages from Socket.IO
  useEffect(() => {
    socket.on("messageReceived", (message) => {
      // Handle the new message received from the server
      console.log("Received message from Socket.IO:", message);
      const messages = document.getElementById("messages");
      const item = document.createElement("li");
      item.textContent = message;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      // // Send a new message via GraphQL mutation
      await addChat({
        variables: { text: chatData.text, author: chatData.author },
      });

      // Emit the same message to the Socket.IO server
      socket.emit("sendMessage", chatData.text);
      console.log("Sent message:", chatData.text);

      setChatData({
        text: "",
        author: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: "silver" }}>
      <h1>Live Chat</h1>
      <div>
        {data.messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      {/* <ul id="messages"></ul> */}
      <form>
        <input
          type="text"
          value={chatData.text}
          onChange={(e) => setChatData((data) => ({...chatData, text: e.target.value}))}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </form>
    </div>
  );
}
