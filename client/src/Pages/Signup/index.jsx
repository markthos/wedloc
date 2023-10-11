import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', userData);
      console.log('User successfully added:', response.data);
      // Redirect to login or another page after successful registration
    } catch (error) {
      console.error('Error during registration:', error.response.data);
      // Handle registration errors (like showing error messages to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleInputChange} placeholder="Username" required />
      <input type="email" name="email" onChange={handleInputChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleInputChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;

