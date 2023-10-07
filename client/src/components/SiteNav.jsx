// Site Navigation Component


import { Link as RouterLink, NavLink } from 'react-router-dom';

export default function SiteNav() {
  return (
    <div>
      <h1>wedloc</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink> | 
        <RouterLink to="/login">Login</RouterLink> | 
        <RouterLink to="/signup">Signup</RouterLink> | 
        <RouterLink to="/profile">Profile</RouterLink> | 
        <RouterLink to="/comment">Comment</RouterLink> | 
        <RouterLink to="/event-creator">EventCreator</RouterLink> | 
        <RouterLink to="/event-space">EventSpace</RouterLink> | 
        <RouterLink to="/live-chat">Live Chat</RouterLink> |
        <RouterLink to="/upload">Upload</RouterLink> | 
      </nav>
    </div>
  );
}
