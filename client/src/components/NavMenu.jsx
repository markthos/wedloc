// Sitewide navigation menu component


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
    <div ref={menuRef} className="absolute right-3 top-3 cursor-pointer">
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon fontSize="large" />
      </div>

      <div
        className={`border-opacity-15 absolute right-2.5 top-24 w-[11vw] transform border px-5 py-2.5 text-lg 
        ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[-20px] opacity-0"
        } transition-all duration-500 ease-in-out`}
      >
        <ul>
          <li className="list-none p-2.5">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="list-none p-2.5">
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li className="list-none p-2.5">
            <RouterLink to={"/signup"}>Sign Up</RouterLink>
          </li>
          <li className="list-none p-2.5">
            <NavLink to={"/eventcreator"}>Create Event</NavLink>
          </li>
          <li className="list-none p-2.5">
            <NavLink to={"/eventspace"}>Event Space</NavLink>
          </li>
          <li className="list-none p-2.5">
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}