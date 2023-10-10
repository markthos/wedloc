import React, { useState } from "react";
import { CiLogin } from 'react-icons/ci';
import { MdOutlineHome, MdMenu, MdOutlinePersonAddAlt1, MdOutlineAddToPhotos, MdOutlineInfo } from 'react-icons/md'
import { FaRegAddressCard } from 'react-icons/fa'

let home = {MdOutlineHome}
let login = {CiLogin}
let signup = {MdOutlinePersonAddAlt1}
let createEvent = {MdOutlineAddToPhotos}
let myEvents = {FaRegAddressCard}
let about = {MdOutlineInfo}

// I want to add logic that prevents this menu from displaying whichever page the user is currently on, but that's not a right now task.

 function NavMenu({ currentPage, handlePageChange }) {
    return (
        <div className="menu-container">
            <div className="menu-trigger">
                {MdMenu}
            </div>

            <div className="dropdown-menu">
                <h3>Test<br/><span>This is a test</span></h3>
                <ul>
                    <li className="homeNav">
                        <a 
                        href="#Home"
                        onClick={() => handlePageChange('Home')}
                        className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
                        >
                        {home} Home
                        </a>
                    </li>
                    <li className="loginNav">
                        <a 
                        href="#Login"
                        onClick={() => handlePageChange('Login')}
                        className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                        >
                        {login} Login
                        </a>
                    </li>
                    <li className="signupNav">
                        <a 
                        href="#Signup"
                        onClick={() => handlePageChange('Signup')}
                        className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
                        >
                        {signup} Sign Up
                        </a>
                    </li>
                    <li className="createEventNav">
                        <a 
                        href="#CreateEvent"
                        onClick={() => handlePageChange('CreateEvent')}
                        className={currentPage === 'CreateEvent' ? 'nav-link active' : 'nav-link'}
                        >
                        {createEvent} Create Event
                        </a>
                    </li>
                    <li className="myEventsNav">
                        <a 
                        href="#MyEvents"
                        onClick={() => handlePageChange('MyEvents')}
                        className={currentPage === 'MyEvents' ? 'nav-link active' : 'nav-link'}
                        >
                        {myEvents} My Events
                        </a>
                    </li>
                    <li className="AboutNav">
                        <a 
                        href="#About"
                        onClick={() => handlePageChange('About')}
                        className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
                        >
                        {about} About Us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavMenu;