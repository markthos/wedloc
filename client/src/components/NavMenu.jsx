// Sitewide navigation menu component

import React from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AuthService from "../utils/auth";

export default function NavMenu({ currentPage, handlePageChange }) {
  const isAuthenticated = AuthService.loggedIn();

  // Storing the labels and routes in an array to loop through
  const menuItemsAuthenticated = [
    { label: "Home", route: "/" },
    { label: "Event Creator", route: "/eventcreator" },
    { label: "My Events", route: "/myevents" },
    { label: "My Profile", route: "/profile" },
    { label: "About Us", route: "/about" },
    { label: "Payment", route: "/payment" },
    { label: "Sign Out", route: "/signout" },
  ];

  const menuItemsUnauthenticated = [
    { label: "Home", route: "/" },
    { label: "Sign Up", route: "/signup" },
    { label: "Log In", route: "/login" },
    { label: "About Us", route: "/about" },
    { label: "Payment", route: "/payment" },
  ];

  const menuItemsToRender = isAuthenticated
    ? menuItemsAuthenticated
    : menuItemsUnauthenticated;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" className="text-black" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItemsToRender.map((item) => (
          <MenuItem key={item.label} onClick={handleClose}>
            <NavLink to={item.route} className="w-screen px-2 py-1 md:w-max md:px-4 md:py-2 font-sans text-lg">
              {item.label}
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
