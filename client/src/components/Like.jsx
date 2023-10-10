import React, { useState } from 'react';

export default function Like() {
  const [likeCount, setLikeCount] = useState(0); // Initialize state for like count

  // Function to handle click event
  const handleLike = () => {
    setLikeCount(likeCount + 1); // Increment like count on click
  };

  return (
    <div>
      <button onClick={handleLike} style={styles.buttonStyle}>👍 Like</button>
      <p style={styles.countStyle}>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</p>
    </div>
  );
}

// Inline CSS styles
const styles = {
  buttonStyle: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0084FF',
    color: 'white',
  },
  countStyle: {
    marginTop: '10px',
    fontSize: '14px',
  },
};
