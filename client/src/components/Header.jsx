// The site header where the navigation and logo live
// All links will be changed to NavLinks in the future to use the active class functionality of react-router-dom


import { Link as RouterLink, NavLink, Link } from 'react-router-dom';

export default function Header() {

  return (
    <div>
      <h1
        className="text-center font-logo"
        style={{ fontSize: 64, margin: 0, padding: 0 }}
      >
        WedLoc
      </h1>
      <nav className="nav headerText">
        <ul>
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
      </nav>
    </div>
  );
}