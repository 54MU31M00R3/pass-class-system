import React from 'react'

function LoginForm({ formToggler }) {
    const loginSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <form className='loginForm'>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' />
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' />
                <button onClick={loginSubmit}>LOGIN</button>
            </form>
            <button onClick={formToggler}>SWITCH TO SIGNUP</button>
        </>
    )
}

export default LoginForm