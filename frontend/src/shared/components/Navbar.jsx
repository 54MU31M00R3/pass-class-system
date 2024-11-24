import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
        <>
            <div className='header'>
                <ul className='navLinks'>
                    <li>
                        <NavLink className='headerLink' to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className='headerLink' to='/:uid/dashboard'>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className='headerLink' to='/login'>Login</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default Navbar;