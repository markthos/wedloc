// The site header where the navigation and logo live
// All links will be changed to NavLinks in the future to use the active class functionality of react-router-dom

import NavMenu from "./NavMenu";
import { Link as RouterLink, NavLink, Link } from 'react-router-dom';

export default function Header() {

  return (
    <header className="relative">
      <h1 className="font-logo py-3 text-center text-6xl">
        <RouterLink to={"/"}>WedLoc</RouterLink>
      </h1>
      <NavMenu className="relative" />
      {/* <nav className="font-sans">
        <ul className="flex justify-evenly">
          <li>
            <RouterLink to={"/"}>Home</RouterLink>
          </li>
          <li>
            <RouterLink to={"signup"}>Sign Up</RouterLink>
          </li>
          <li>
            <RouterLink to={"login"}>Login</RouterLink>
          </li>
          <li>
            <RouterLink to={"about"}>About</RouterLink>
          </li>
          <li>
            <RouterLink to={"eventcreator"}>Event Creator</RouterLink>
          </li>
          <li>
            <RouterLink to={"eventspace"}>Event Space</RouterLink>
          </li>
          <li>
            <RouterLink to={"livechat"}>Live Chat</RouterLink>
          </li>
          <li>
            <RouterLink to={"profile"}>Profile</RouterLink>
          </li>
          <li>
            <RouterLink to={"singleview"}>Single View Page</RouterLink>
          </li>
          <li>
            <RouterLink to={"upload"}>Upload Page</RouterLink>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}