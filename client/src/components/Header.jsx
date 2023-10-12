// The site header where the navigation and logo live


import NavMenu from "./NavMenu";
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {

  return (
    <header className="relative bg-white">
      {/* Site Logo */}
      <h1 className="pt-3 text-center font-logo text-4xl md:text-6xl">
        <RouterLink to={"/"}>WedLoc</RouterLink>
      </h1>
      {/* Profile Icon, if logged in it will be an image */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 transform">
        <RouterLink to={"/profile"}>
          <AccountCircleIcon fontSize="large" />
        </RouterLink>
      </div>
      {/* Navigation Menu */}
      <NavMenu />

    </header>
  );
}