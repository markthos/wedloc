// The site header where the navigation and logo/profile pic live

import React, { useState, useEffect } from 'react';
import NavMenu from "./NavMenu";
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from '@apollo/client';
import { GET_USER_PIC } from '../utils/queries';

export default function Header() {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const { loading, data } = useQuery(GET_USER_PIC);
  console.log(data)
  // pull the user profilePic from the query
  useEffect(() => {
    if (data) {
      setUserProfilePic(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <header className="relative bg-white">
      {/* Site Logo */}
      <span className="pt-3 text-center font-logo text-4xl md:text-6xl block">
        <RouterLink to="/">WedLoc</RouterLink>
      </span>
      {/* Profile Icon or Image */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 transform">
        {userProfilePic ? (
          <RouterLink to="/profile">
            <img src={userProfilePic} alt="Profile" />
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
