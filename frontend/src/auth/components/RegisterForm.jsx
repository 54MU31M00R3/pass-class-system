import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { toast } from 'react-toastify';

// this component will allow a user to register for an account

function RegisterForm({ formToggler }) {
    // tailwind css
    const labelClass = 'text-lg font-medium';
    const formInput = 'flex flex-col pb-5';
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';

    // will be user to log the user in if account creation is successful
    const auth = useContext(AuthContext);
    // will be used to redirect the user upon account creation
    const navigate = useNavigate();

    // on submit handler used to send a post request to create an account
    const registerSubmit = async (event) => {
        // prevent default behaviour of button to refresh page
        event.preventDefault();
        // post request to create account
        try {
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
                toast.error('Credentials Invalid');
                throw new Error(responseData.message);
            }

            toast.success('Account Created');

            // logs user in and sets associated credentials
            auth.login(responseData.user.id, responseData.user.role);
            // redirect user to homepage
            return navigate('/');
        } catch (error) {
            toast.error('Credentials Invalid');
        }
    }


    return (
        <>
            {/* form used to accept inputs to create user accounts, incuding
                a username, email, password, and yuId, no validation has been created yet */}
            <div className='w-full flex justify-center text-center pt-5'>
                <div className='flex flex-col justify-between h-full  w-96 text-center rounded-md shadow-lg border-2 bg-gray-100'>
                    <h1 className='text-3xl font-black text-red-600 pt-5'>
                        Signup
                    </h1>
                    <div className='flex justify-around pb-10'>
                        <form className='flex flex-col gap-5 text-left w-64 pt-8' onSubmit={registerSubmit}>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='username'>Username</label>
                                <input id='username' type='text' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='email'>Email</label>
                                <input id='email' type='email' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='yuId'>YU ID</label>
                                <input id='yuId' type='text' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='password'>Password</label>
                                <input id='password' type='password' />
                            </div>
                            <div className='flex justify-between '>
                                <button className={buttonClass} type='button' onClick={formToggler}>Switch to Login</button>
                                <button className={buttonClass} type='submit'>Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterForm