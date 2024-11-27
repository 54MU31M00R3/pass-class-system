import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import users from '../../assets/dummyData/users.json';
import faculty from '../../assets/dummyData/faculty.json';

function RegisterForm({ formToggler }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const registerSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                yuId: yuId.value,
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
                    <form className='formDetails' onSubmit={registerSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' />
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' />
                        <label htmlFor='yuId'>ID Number</label>
                        <input id='yuId' type='text' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' />
                        <button type='submit'>SIGNUP</button>
                    </form>
                    <button className='formToggler' onClick={formToggler}>SWITCH TO LOGIN</button>
                </div>
            </div>
        </>
    )
}

export default RegisterForm