// The site header where the navigation and logo/profile pic live

import React, { useState, useEffect } from 'react';
import NavMenu from "./NavMenu";
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthService from '../utils/auth';
import { GET_ME } from '../../utils/queries';
import axios from 'axios'; // Import Axios

export default function Header() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    console.log('Fetching user profile');
    // Check if the user is authenticated
    if (AuthService.loggedIn()) {
      // Fetch user profile data using the JWT token
      console.log('Is Logged In');
      
      // axios.get('/api/get_me', {
      //   headers: {
      //     Authorization: `Bearer ${AuthService.getToken()}`,
      //   },
      // })
      // .then((response) => {
      //   setUserProfile(response.data)

      // })
      // .catch((error) => {
      //   console.error('Error fetching user profile:', error);
      // });
    }
  }, []);

  return (
    <header className="relative bg-white">
      {/* Site Logo */}
      <span className="pt-3 text-center font-logo text-4xl md:text-6xl block">
        <RouterLink to="/">WedLoc</RouterLink>
      </span>
      {/* Profile Icon or Image */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 transform">
        {userProfile ? (
          <RouterLink to="/profile">
            <img src={userProfile.profilePic} alt="Profile" />
          </RouterLink>
        ) : (
          <RouterLink to="/profile">
            <AccountCircleIcon fontSize="large" />
          </RouterLink>
        )}
      </div>
      {/* Navigation Menu */}
      <NavMenu />
    </header>
  );
}





  // return (
  //   <header className="relative bg-white">
  //     {/* Site Logo */}
  //     <span className="pt-3 text-center font-logo text-4xl md:text-6xl block">
  //       <RouterLink to={"/"}>WedLoc</RouterLink>
  //     </span>
  //     {/* Profile Icon, if logged in it will be an image */}
  //     <div className="absolute right-16 top-1/2 -translate-y-1/2 transform">
  //       <RouterLink to={"/profile"}>
  //         <AccountCircleIcon fontSize="large" />
  //       </RouterLink>
  //     </div>
  //     {/* Navigation Menu */}
  //     <NavMenu />

  //   </header>
  // );
