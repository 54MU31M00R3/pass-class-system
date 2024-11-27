import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import users from '../../assets/dummyData/users.json';

function LoginForm({ formToggler }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const loginSubmit = async (event) => {
        event.preventDefault();

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

        auth.login(responseData.user.id, responseData.user.role);
        navigate('/');
    }

    return (
        <>
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