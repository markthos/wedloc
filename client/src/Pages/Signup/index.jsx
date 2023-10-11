// The Sign Up page


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';

export default function Signup() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [addUser, { loading, error, data }] = useMutation(REGISTER_USER);

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
      const { data } = await addUser({ variables: { ...userData } });
      console.log('User successfully added:', data);
      // Redirect to login or another page after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration errors (like showing error messages to the user)
    }
  };

  return (
    <main className="bg-main_bg min-h-screen">
      <section className='container m-auto'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
}