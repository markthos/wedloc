// SignOut.jsx

import React, { useEffect } from 'react';
import AuthService from '../../utils/auth';

const SignOut = () => {
  useEffect(() => {
    localStorage.removeItem("name");
    // Perform the sign-out logic in this component
    AuthService.logout();
    // Redirect to the home page or any other desired page
    window.location.assign('/');
  }, []);

  return (
    <div>
      Signing out...
    </div>
  );
};

export default SignOut;
