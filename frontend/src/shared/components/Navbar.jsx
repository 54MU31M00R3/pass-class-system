import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

import '../styles/Navbar.css';

function Navbar() {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className='header'>
                <h1 className='headerTitle'>PASS CLASS</h1>
                <ul className='navLinks'>
                    <li>
                        <NavLink className='headerLink' to='/'>Home</NavLink>
                    </li>
                    {auth.isLoggedIn && (<li>
                        <NavLink className='headerLink' to={`/${auth.userId}/dashboard`}>My Sections</NavLink>
                    </li>)}
                    {!auth.isLoggedIn && (<li>
                        <NavLink className='headerLink' to='/login'>Login</NavLink>
                    </li>)}
                    {auth.isLoggedIn && (auth.role === 'pass leader') && (<li>
                        <NavLink className='headerLink' to='/section/create'>Create Section</NavLink>
                    </li>)}
                    {auth.isLoggedIn && (<li>
                        <NavLink onClick={auth.logout} className='headerLink' to='/'>Logout</NavLink>
                    </li>)}
                </ul>
            </div>
        </>
    )
};

export default Navbar;