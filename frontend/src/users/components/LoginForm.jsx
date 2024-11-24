import React from 'react'

function LoginForm({ formToggler }) {
    return (
        <>
            <form className='loginForm'>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' />
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' />
                <button>LOGIN</button>
            </form>
            <button>SWITCH TO SIGNUP</button>
        </>
    )
}

export default LoginForm