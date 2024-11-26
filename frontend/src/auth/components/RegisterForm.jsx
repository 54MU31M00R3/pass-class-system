import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import users from '../../assets/dummyData/users.json';
import faculty from '../../assets/dummyData/faculty.json';

function RegisterForm({ formToggler }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const registerSubmit = (event) => {
        event.preventDefault();

        const facultyMember = faculty.find(employee => employee.id === idNum)
        let userRole;
        if (facultyMember) {
            userRole = facultyMember.role
        } else {
            userRole = 'student'
        }

        const newUser = {
            username: username.value,
            email: email.value,
            id: idNum.value,
            password: password.value,
            sectionIds: [],
            role: userRole 
        }

        users.push(newUser);
        console.log(newUser);
        console.log(users);

        auth.login(idNum.value, userRole);
        navigate('/')
    }

    return (
        <>
            <div className='formContainer'>
                <div className='authForm'>
                    <form className='formDetails' onSubmit={registerSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' />
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' />
                        <label htmlFor='idNum'>ID Number</label>
                        <input id='idNum' type='text' />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' />
                        <button type='submit'>SIGNUP</button>
                    </form>
                    <button onClick={formToggler}>SWITCH TO LOGIN</button>
                </div>
            </div>
        </>
    )
}

export default RegisterForm