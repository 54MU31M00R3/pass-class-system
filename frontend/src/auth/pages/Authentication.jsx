import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import '../../shared/styles/Forms.css';

// this component will return either a login or register form

function Authentication() {
    // keeps track of the forms state
    const [loginMode, setLoginMode] = useState(true);

    // on click handler that will allow user to switch between forms
    const loginModeHandler = () => {
        setLoginMode(loginMode => !loginMode);
    }

    // if in login mode the component will return the login form
    // if not it will return the form to register
    if (loginMode) {
        return <LoginForm formToggler={loginModeHandler}/>
    } else {
        return <RegisterForm formToggler={loginModeHandler}/>
    }
}

export default Authentication;