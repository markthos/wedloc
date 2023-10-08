// The site header where the navigation and logo live
// All links will be changed to NavLinks in the future to use the active class functionality of react-router-dom


import { Link as RouterLink, NavLink, Link } from 'react-router-dom';

export default function Header() {

  return (
    <div>
      <h1>wedloc</h1>
      <nav>
        <ul>
          <li>
            <RouterLink to={'Home'}>Home</RouterLink>
          </li>
          <li>
            <RouterLink to={'About'}>About</RouterLink>
          </li>
          <li>
            <RouterLink to={'EventCreator'}>Event Creator</RouterLink>
          </li>
          <li>
            <RouterLink to={'EventSpace'}>Event Space</RouterLink>
          </li>
          <li>
            <RouterLink to={'LiveChat'}>Live Chat</RouterLink>
          </li>
          <li>
            <RouterLink to={'Login'}>Login</RouterLink>
          </li>
          <li>
            <RouterLink to={'Profile'}>Profile</RouterLink>
          </li>
          <li>
            <RouterLink to={'Signup'}>Sign Up</RouterLink>
          </li>
          <li>
            <RouterLink to={'SingleView'}>Single View Page</RouterLink>
          </li>
          <li>
            <RouterLink to={'Upload'}>Upload Page</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}