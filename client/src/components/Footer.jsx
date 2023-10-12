// The Site Footer


import { Link as RouterLink } from 'react-router-dom';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Footer() {
  
  // Scrolls to the top of the page when the up arrow is clicked
  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white py-3 text-center">
      <p className="font-sans">
        Copyright ©
        <RouterLink to={"/"}>
          <span className="mx-2 font-logo text-3xl">WedLoc</span>
        </RouterLink>
        2023
      </p>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 transform">
        <button
          type="button"
          onClick={handleClickToTop}
          className="hover:text-darkgray focus:outline-none"
        >
          <KeyboardArrowUpIcon fontSize='large' />
        </button>
      </div>
    </footer>
  );
}
