import React, { useState, useEffect, useRef, } from "react";
import { Link as RouterLink, NavLink } from 'react-router-dom'
import './index.css'
import navMenuIcon from '../../images/navMenuIcon.png'



 function NavMenu() {

    // this is for dropdown display
    const [open, setOpen] = useState(false);
    
    let menuRef = useRef();

    // this allows users to close the dropdown menu by clicking outside the element
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    });

    // container remembers our menuRef state
    // trigger reverses useState on click
    // tried to add icon library, flailed for a while, went with the quick n dirty fix
    // NavLinks appear to work perfectly
    return (
        <div className="menu-container" ref={menuRef}>
            <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                <img src={navMenuIcon}></img>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <ul>
                    <li className="liNav">
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li className="liNav">
                        <NavLink to={'/login'}>Login</NavLink>
                    </li>
                    <li className="liNav">
                        <RouterLink to={'/signup'}>Sign Up</RouterLink>
                    </li>
                    <li className="liNav">
                        <NavLink to={'/eventcreator'}>Create Event</NavLink>
                    </li>
                    <li className="liNav">
                        <NavLink to={'/eventspace'}>Event Space</NavLink>
                    </li>
                    <li className="liNav">
                        <NavLink to={'/about'}>About</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavMenu;