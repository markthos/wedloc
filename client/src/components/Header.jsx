import React, { useState, useEffect } from 'react';
import NavMenu from "./NavMenu";
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

export default function Header() {
  const [userProfilePic, setUserProfilePic] = useState(null);
  const { loading, data } = useQuery(GET_USER);

  // Update userProfilePic when data is available
  useEffect(() => {
    if (!loading && data) {
      setUserProfilePic(data.me.profilePic);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="relative bg-white">
      {/* Site Logo */}
      <span className="block pt-3 text-center font-logo text-4xl md:text-6xl">
        <RouterLink to="/">WedLoc</RouterLink>
      </span>
      {/* Profile Icon or Image */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 transform">
        {userProfilePic ? (
          <RouterLink to="/profile">
            <img
              src={userProfilePic}
              alt="Profile"
              className="h-10 w-10 self-center rounded-full object-cover"
            />
          </RouterLink>
        ) : (
          <RouterLink to="/login">
            <AccountCircleIcon fontSize="large" />
          </RouterLink>
        )}
      </div>
      {/* Navigation Menu */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
        <NavMenu />
      </div>
    </header>
  );
}