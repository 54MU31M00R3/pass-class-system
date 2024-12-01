import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

// this form allows a user to login and access their account

function LoginForm({ formToggler }) {
    // used to log the user in upon a successful post request
    const auth = useContext(AuthContext);
    // used to redirect the user
    const navigate = useNavigate();
    const labelClass = 'text-lg font-medium';
    const formInput = 'flex flex-col pb-8';
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';

    // submit handler used to send a post request and check user credentials
    const loginSubmit = async (event) => {
        // prevent button from reloading page
        event.preventDefault();

        // post request to check entered account details
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        // logs user in with associated credentials
        auth.login(responseData.user.id, responseData.user.role);
        // navigates user to homepage
        navigate('/');
    }

    return (
        <>
            {/* form used to accept inputs to login, incuding
                a email and password */}
            <div className='w-full flex justify-center text-center pt-5'>
                <div className='flex flex-col justify-between h-96  w-96 text-center rounded-md shadow-lg border-2 bg-gray-100'>
                    <h1 className='text-3xl font-black text-red-600 pt-5'>
                        Login
                    </h1>
                    <div className='flex justify-around pb-10'>
                        <form className='flex flex-col gap-5 text-left w-64' onSubmit={loginSubmit}>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='email'>Email</label>
                                <input id='email' type='email' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='password'>Password</label>
                                <input id='password' type='password' />
                            </div>
                            <div className='flex justify-between '>
                                <button className={buttonClass} type='button' onClick={formToggler}>Switch to Signup</button>
                                <button className={buttonClass} type='submit'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm