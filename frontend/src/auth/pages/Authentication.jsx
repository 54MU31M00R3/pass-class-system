import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import '../styles/AuthForms.css';

function Authentication() {
    const [loginMode, setLoginMode] = useState(true);

    const loginModeHandler = () => {
        setLoginMode(loginMode => !loginMode);
    }

    if (loginMode) {
        return <LoginForm formToggler={loginModeHandler}/>
    } else {
        return <RegisterForm formToggler={loginModeHandler}/>
    }
}

export default Authentication;