import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

// this form allows a user to login and access their account

function LoginForm({ formToggler }) {
    // used to log the user in upon a successful post request
    const auth = useContext(AuthContext);
    // used to redirect the user
    const navigate = useNavigate();

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
            <div className='formContainer'>
                <div className='subFormContainer'>
                    <form className='formDetails' onSubmit={loginSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' />
                        <button type='submit'>LOGIN</button>
                    </form>
                    <button className='formToggler' onClick={formToggler}>SWITCH TO SIGNUP</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm