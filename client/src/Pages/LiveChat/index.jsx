// Live Chat Page

//!!! EVERYTHING IS WORKING EXCEPT DATE
//TODO DATE

import { useQuery, useMutation } from "@apollo/client";
import io from "socket.io-client";
import { GET_CHAT } from "../../utils/queries";
import { ADD_CHAT } from "../../utils/mutations";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Orbit } from "@uiball/loaders";
import UnixTimestampConverter from "../../components/UnixTimestampConverter";
import dayjs from "dayjs";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";

// Create a Socket.IO client instance
const socket = io("https://wedloc-84c89e3ae29d.herokuapp.com/"); //! SET TO PRODUCTION URL WHEN DEPLOYED "https://wedloc-84c89e3ae29d.herokuapp.com/"

//* This is the LiveChat component
export default function LiveChat() {
  // Get the event ID from the URL
  const { eventId } = useParams();

  useEffect(() => {
    socket.emit("joinEventRoom", eventId);
  }, [eventId]);

  const [name, setName] = useState(localStorage.getItem("name"));
  const navigate = useNavigate();

  // set up state for chat data and set default author to local storage name
  const [chatData, setChatData] = useState({
    capsuleId: eventId,
    text: "",
    author: name, // grab local storage name as default
  });

  // Query the database for the chat history
  const { loading, data } = useQuery(GET_CHAT, {
    variables: { id: eventId },
  });

  // check if there is chat history
  const chatHistory = data?.getCapsule || [];

  // Create a new message via GraphQL mutation and set createMessage to a function
  const [createMessage, { error }] = useMutation(ADD_CHAT, {
    variables: {
      capsuleId: chatData.capsuleId,
      text: chatData.text,
      author: chatData.author,
    },
  });

  // scroll to the bottom on load
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
        <p>${dayjs(message.date).format("hh:mm:ss A")}</p>
      </div>
      ${
        message.author === name
          ? `<p class="flex justify-end rounded-xl bg-lightgray px-4 py-1 font-bold">${message.text}</p>`
          : `<p class="flex flex-col rounded-xl bg-white px-4 py-1.5">${message.text}</p>`
      }`;
      messages.appendChild(item);

      scrollToBottom();
    });

    // check name and navigate to signup if no name
    if (!name) {
      navigate(`/eventspace/${eventId}/attendeesignup`);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  // function to scroll to the bottom
  const scrollToBottom = () => {
    const chatBox = document.querySelector(".no-scrollbar");
    if (chatBox) {
      chatBox.style.scrollBehavior = "smooth"; // Enable smooth scrolling
      chatBox.scrollTop = chatBox.scrollHeight;
      chatBox.style.scrollBehavior = "auto"; // Reset to default behavior
    }
  };

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

      // Emit the same message to the Socket.IO server immediately
      socket.emit("sendMessageToEventRoom", eventId, chatData);

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

  // handle back button return
  const handleReturn = () => {
    navigate(`/eventspace/${eventId}`);
  };

  // return the chat history and the form to send a message
  return (
    <section className="container m-auto flex w-96 flex-col items-center justify-center mb-4">
      <h1 className="text-center font-extrabold">Live Chat</h1>
      <div className="no-scrollbar flex h-[70vh] flex-col items-center justify-center overflow-y-scroll p-6">
        <ul id="messages" className="h-full">
          {/* map over the chat history and display the messages */}
          {chatHistory.chat.map((message) => (
            <li key={message._id}>
              <div className="flex justify-between gap-3">
                <h3>{message.author}</h3>
                <UnixTimestampConverter
                  unixTimestamp={message.date}
                  type="livechat"
                />
              </div>
              {message.author === name ? (
                <p className="flex justify-end rounded-xl bg-lightgray px-4 py-1 font-bold">
                  {message.text}
                </p>
              ) : (
                <p className="flex flex-col rounded-xl bg-white px-4 py-1.5">
                  {message.text}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <form
        className="flex w-full justify-between items-baseline gap-3 px-6 pt-3"
        onSubmit={handleSendMessage}
      >
        <StyledFormInput
          fullWidthStyle
          type="text"
          value={chatData.text}
          required
          placeholder="Message the Event"
          className="w-full resize"
          onChange={(e) =>
            setChatData(() => ({
              ...chatData,
              text: e.target.value,
            }))
          }
        />
        <StyledButton type="submit" primaryColor>
          Send
        </StyledButton>
      </form>
      <StyledButton primaryColor onClick={handleReturn}>
        Back
      </StyledButton>
    </section>
  );
}
