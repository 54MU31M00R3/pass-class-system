import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

import logo from '../../assets/images/yorku.png'
import '../styles/Navbar.css';

// this component displays links for the user to click based on
// their credentials

function Navbar() {
    const auth = useContext(AuthContext);
    const navLinkClass = ({ isActive }) => isActive ? `bg-white
    text-red-600 rounded-md 
    px-3 py-2` : `text-white hover:bg-white hover:text-red-600 rounded-md 
    px-3 py-2`;

    return (
        <>
            <div className='flex h-20 justify-between items-center bg-red-600'>
                <div className='flex items-center'>
                    <img className='object-cover h-20 w-20 scale-125 overflow-hidden ml-3' src={logo} alt='YorkULogo'/>
                    <h1 className='pl-6 text-6xl text-white font-black'>Pass Class</h1>
                </div>
                <ul className='flex gap-6 pr-6 text-2xl'>
                    <li>
                        <NavLink className={navLinkClass} to='/'>Home</NavLink>
                    </li>
                    {/* a user can only see this link if logged in */}
                    {auth.isLoggedIn && (<li>
                        <NavLink className={navLinkClass} to={`/${auth.userId}/dashboard`}>My Sections</NavLink>
                    </li>)}
                    {/* a user can only see this link if logged in */}
                    {!auth.isLoggedIn && (<li>
                        <NavLink className={navLinkClass} to='/login'>Login</NavLink>
                    </li>)}
                    {/* a user can only see this link if logged in and a pass leader*/}
                    {auth.isLoggedIn && (auth.role === 'pass leader') && (<li>
                        <NavLink className={navLinkClass} to='/section/create'>Create Section</NavLink>
                    </li>)}
                    {/* a user can only see this link if logged in */}
                    {auth.isLoggedIn && (<li>
                        <NavLink onClick={auth.logout} className={navLinkClass} to='/login'>Logout</NavLink>
                    </li>)}
                </ul>
            </div>
        </>
    )
};

export default Navbar;