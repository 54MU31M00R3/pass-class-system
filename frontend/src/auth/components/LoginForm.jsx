import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import users from '../../assets/dummyData/users.json';

function LoginForm({ formToggler }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const loginSubmit = (event) => {
        event.preventDefault();

        const foundUser = users.find(user => (user.email === email.value));
        if (foundUser && (foundUser.password === password.value)){
            auth.login(foundUser.id, foundUser.role);
            navigate('/');
        } else {
            email.value = '';
            password.value = '';
        }
    }

    return (
        <>
            <div className='formContainer'>
                <div className='authForm'>
                    <form className='formDetails'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' />
                        <button onClick={loginSubmit}>LOGIN</button>
                    </form>
                    <button onClick={formToggler}>SWITCH TO SIGNUP</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm