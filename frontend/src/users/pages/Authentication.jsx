import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import '../styles/Users.css';

function Authentication() {
    const [loginMode, setLoginMode] = useState(true);

    if (loginMode) {
        return <LoginForm formToggler={setLoginMode}/>
    } else {
        return <RegisterForm formToggler={setLoginMode}/>
    }
}

export default Authentication;