// Sitewide navigation menu component
// TODO: Set up menu so that when a user is not logged in it only shows the following links: Home, Sign Up, Login, About
// TODO: Set up menu so that when a user is logged in it shows the following links: Home, My Profile, Event Creator, My Events, About, Sign Out
// TODO: The width and height of the menu should be 100% wide and 50% tall of the viewport when in a small screen size, the size of the text should increase as well


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
        className={`absolute right-0 top-0 min-w-max transform border px-5 py-2.5 text-lg 
        ${
          open ? "bg-white visible" : "invisible"
        } transition-all duration-500 ease-in-out`}
      >
        <ul>
          <li className="list-none p-2.5">
            <RouterLink to={"/"}>Home</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"signup"}>Sign Up</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"login"}>Login</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"about"}>About</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"eventcreator"}>Event Creator</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"myevents"}>My Events</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"eventspace"}>Event Space</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"livechat"}>Live Chat</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"profile"}>Profile</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"singleview"}>Single View Page</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"upload"}>Upload Page</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
}