import React from 'react'

function RegisterForm({ formToggler }) {
    const registerSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='formContainer'>
                <div className='authForm'>
                    <form className='formDetails'>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' />
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' />
                        <label htmlFor='studentNum'>Student Number</label>
                        <input id='studentNum' type='text' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='text' />
                        <button onClick={registerSubmit}>SIGNUP</button>
                    </form>
                    <button onClick={formToggler}>SWITCH TO LOGIN</button>
                </div>
            </div>
        </>
    )
}

export default RegisterForm