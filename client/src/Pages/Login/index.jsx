// The Log In Page


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'

export default function Login(props) {
  const [formState, setFormState] = useState({username: '', password: ''});
  const [login, { error, data}] = useMutation(LOGIN_USER);
  
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    })
  };

  return (
    <section className="flex min-h-full">
      <div className="w-1/2 bg-darkgray">Picture Area</div>
      <div className="flex w-1/2">
        <div className="">
          {data ? (
            <p>
              <Link to={"/"}>Home</Link>
            </p>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-center"
            >
              <input
                className="form-input mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formState.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                className="form-input mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formState.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{ cursor: "pointer" }}
              >
                Log In
              </button>
            </form>
          )}
          {error && <div className="">{error.message}</div>}
        </div>
      </div>
    </section>
    // <section className="container m-auto">

    // </section>
  );
};
