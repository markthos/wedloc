// The Site Footer


import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {

  return (
    <footer className="bg-white text-center py-3">
      <p className="font-sans">
        Copyright ©{" "}
        <RouterLink to={"/"}>
          <span className="font-logo text-3xl">WedLoc</span>
        </RouterLink>{" "}
        2023
      </p>
    </footer>
  );
}
