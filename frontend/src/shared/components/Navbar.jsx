import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/Navbar.css';

function Navbar() {
    return (
        <>
            <div className='header'>
                <h1 className='headerTitle'>PASS CLASS</h1>
                <ul className='navLinks'>
                    <li>
                        <NavLink className='headerLink' to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className='headerLink' to='/:uid/dashboard'>My Sections</NavLink>
                    </li>
                    <li>
                        <NavLink className='headerLink' to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink className='headerLink' to='/section/create'>Create Section</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default Navbar;