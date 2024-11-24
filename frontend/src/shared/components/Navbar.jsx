import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <div className='header'>
        <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>Login</li>
        </ul>
    </div>
  )
};

export default Navbar;