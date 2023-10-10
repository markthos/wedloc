// The Log In Page
import React, { useState } from 'react';
import { checkPassword, validateEmail } from '../../../utils/helpers';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'userName') {
      setUserName(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!userName) {
      setErrorMessage('Username is invalid, please try again.');
      return;
    }
    if (!checkPassword(password)) {
      setErrorMessage(`Invalid password, please try again.`);
      return;
    }
    alert(`Welcome ${userName}`);

    setUserName('');
    setPassword('');
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <form className="form">
          <input
          value={userName}
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
          />
          <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="password"
          />
          <button type="button" onClick={handleFormSubmit}>Submit</button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
