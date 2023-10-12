// Sitewide navigation menu component
// TODO: Set up menu so that when a user is not logged in it only shows the following links: Home, Sign Up, Login, About
// TODO: Set up menu so that when a user is logged in it shows the following links: Home, My Profile, Event Creator, My Events, About, Sign Out
// TODO: The width and height of the menu should be 100% wide and 50% tall of the viewport when in a small screen size, the size of the text should increase as well
// TODO: Menu should disappear if cursor is not hovering over it
// TODO: When the menu is open it should have an X icon to close it in the upper right corner
// TODO: Get the NavLink active class to work


import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavMenu({ currentPage, handlePageChange }) {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  // Storing the labels and routes in an array to loop through
  const menuItems = [
      { label: 'Home', route: '/' },
      { label: 'Sign Up', route: '/signup' },
      { label: 'Log In', route: '/login' },
      { label: 'About Us', route: '/about' },
      { label: 'Event Creator', route: '/eventcreator' },
      { label: 'My Events', route: '/myevents' },
      { label: 'Event Space', route: '/eventspace' },
      { label: 'Live Chat', route: '/livechat' },
      { label: 'My Profile', route: '/profile' },
      { label: 'Single View', route: '/singleview' },
      { label: 'Upload', route: '/upload' },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer"
    >
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon fontSize="large" />
      </div>

      <div
        className={`absolute right-0 top-15 w-64 transform border text-lg 
        ${
          open ? "visible bg-white" : "invisible"
        } duration-250 transition-all ease-in-out`}
      >
        <ul>
          {/* Looping through the menuItems array so you don't have to repeat all the styles for each link */}
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.route}
                activeClassName="text-red-500"
                className="block p-3 hover:bg-lightgray"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          {/* Separating this link so that it shows at the bottom once the login functionality works */}
          <li>
            <RouterLink to={"/"} className="block p-3 hover:bg-lightgray">
              Sign Out
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}