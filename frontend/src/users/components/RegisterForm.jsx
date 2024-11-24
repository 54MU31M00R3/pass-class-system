import React from 'react'

function RegisterForm({ formToggler }) {
    return (
        <>
            <form className='registerForm'>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' />
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' />
                <label htmlFor='studentNum'>Student Number</label>
                <input id='studentNum' type='text' />
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' />
                <button>SIGNUP</button>
            </form>
            <button>SWITCH TO LOGIN</button>
        </>
    )
}

export default RegisterForm