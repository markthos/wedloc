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
      <main className="bg-main_bg min-h-screen">
        <section className="container m-auto">
          {data ? (
            <p>
              <Link to={"/"}>Home</Link>
            </p>
          ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className='form-input'
              value={formState.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              className='form-input'
              value={formState.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="password"
            />
            <button 
              type="submit" 
              style={{ cursor: 'pointer' }}
            >
              Log In
            </button>
          </form>
          )}
          {error && (
            <div className='errorMessage'>
              {error.message}
            </div>
          )}
        </section>
      </main>
  );
};
