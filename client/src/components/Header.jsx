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
      <NavMenu />
    </header>
  );
}