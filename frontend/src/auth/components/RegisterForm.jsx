import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

// this component will allow a user to register for an account

function RegisterForm({ formToggler }) {
    // will be user to log the user in if account creation is successful
    const auth = useContext(AuthContext);
    // will be used to redirect the user upon account creation
    const navigate = useNavigate();

    // on submit handler used to send a post request to create an account
    const registerSubmit = async (event) => {
        // prevent default behaviour of button to refresh page
        event.preventDefault();
        // post request to create account
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
        // logs user in and sets associated credentials
        auth.login(responseData.user.id, responseData.user.role);
        // redirect user to homepage
        navigate('/');
    }


    return (
        <>
            {/* form used to accept inputs to create user accounts, incuding
                a username, email, password, and yuId, no validation has been created yet */}
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