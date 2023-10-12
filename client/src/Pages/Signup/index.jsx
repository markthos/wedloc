// The Sign Up page


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { Link as RouterLink } from 'react-router-dom';

export default function Signup() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '', firstname: '', lastname: '' });
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
      // Redirect to home page after successful sign up
      window.location.replace('/');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration errors (like showing error messages to the user)
    }
  };

  return (
    <section className="flex min-h-full">
      <div className="hidden bg-darkgray md:block md:w-1/2">Picture Area</div>
      <div className="flex w-screen items-center justify-center md:w-1/2">
        <div className="w-full px-10">
          <form
            onSubmit={handleSubmit}
            className="mb-5 flex flex-col items-center rounded-md bg-beige px-5 py-10 shadow-lg"
          >
            <div className="flex w-full gap-4">
              <input
                className="mb-5 w-1/2 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              <input
                className="mb-5 w-1/2 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              placeholder="Username"
              required
              className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
          <p className="text-right">
            Already a member?{" "}
            <RouterLink to={"/login"} className="underline hover:no-underline">
              Log In Now!
            </RouterLink>
          </p>
        </div>
      </div>
    </section>
  );
}