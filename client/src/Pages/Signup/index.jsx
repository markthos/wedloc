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
      <section className="flex min-h-full">
        <div className="w-1/2 bg-darkgray">Picture Area</div>
        <div className="flex w-1/2">
          <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                placeholder="Username"
                required
                className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
  );
}