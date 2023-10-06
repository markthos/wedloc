import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import io from 'socket.io-client';

//!! playing with this code but need apollo server to be running

// Create a Socket.IO client instance
const socket = io('http://localhost:3001'); // Change the URL to match your Socket.IO server URL

// Define a GraphQL query
const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
    }
  }
`;

// Define a GraphQL mutation
const ADD_MESSAGE = gql`
  mutation AddMessage($text: String!) {
    addMessage(text: $text) {
      id
      text
    }
  }
`;

function LiveChat() {
  const [messageText, setMessageText] = useState('');
  const { loading, data } = useQuery(GET_MESSAGES);
  const [addMessage] = useMutation(ADD_MESSAGE);

  // Listen for new messages from Socket.IO
  useEffect(() => {
    socket.on('messageReceived', (message) => {
      // Handle the new message received from the server
      console.log('Received message from Socket.IO:', message);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('messageReceived');
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      // Send a new message via GraphQL mutation
      await addMessage({ variables: { text: messageText } });

      // Emit the same message to the Socket.IO server
      socket.emit('sendMessage', messageText);

      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        {data.messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default LiveChat;
