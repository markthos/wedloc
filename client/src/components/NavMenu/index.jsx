import React, { useState, useEffect, useRef } from "react";
import './index.css'
import navMenuIcon from '../../images/navMenuIcon.png'



 function NavMenu({ currentPage, handlePageChange }) {

    const [open, setOpen] = useState(false);
    
    let menuRef = useRef();

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

    return (
        <div className="menu-container" ref={menuRef}>
            <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                <img src={navMenuIcon}></img>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <h3>Lo!<br/><span>I am your navigator</span></h3>
                <ul>
                    <li className="homeNav">
                        <a 
                        href="#Home"
                        onClick={() => handlePageChange('Home')}
                        className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
                        >
                        Home
                        </a>
                    </li>
                    <li className="loginNav">
                        <a 
                        href="#Login"
                        onClick={() => handlePageChange('Login')}
                        className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                        >
                        Login
                        </a>
                    </li>
                    <li className="signupNav">
                        <a 
                        href="#Signup"
                        onClick={() => handlePageChange('Signup')}
                        className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
                        >
                        Sign Up
                        </a>
                    </li>
                    <li className="createEventNav">
                        <a 
                        href="#CreateEvent"
                        onClick={() => handlePageChange('CreateEvent')}
                        className={currentPage === 'CreateEvent' ? 'nav-link active' : 'nav-link'}
                        >
                        Create Event
                        </a>
                    </li>
                    <li className="myEventsNav">
                        <a 
                        href="#MyEvents"
                        onClick={() => handlePageChange('MyEvents')}
                        className={currentPage === 'MyEvents' ? 'nav-link active' : 'nav-link'}
                        >
                        My Events
                        </a>
                    </li>
                    <li className="AboutNav">
                        <a 
                        href="#About"
                        onClick={() => handlePageChange('About')}
                        className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
                        >
                        About Us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavMenu;