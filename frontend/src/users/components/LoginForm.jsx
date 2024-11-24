import React from 'react'

function LoginForm({ formToggler }) {
    const loginSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='formContainer'>
                <div className='authForm'>
                    <form className='formDetails'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='text' />
                        <button onClick={loginSubmit}>LOGIN</button>
                    </form>
                    <button onClick={formToggler}>SWITCH TO SIGNUP</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm