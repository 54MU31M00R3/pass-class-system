import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import sections from '../../assets/dummyData/sections.json';

function SectionForm() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const createSectionHandler = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/sections/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseName: courseName.value,
                courseSection: courseSection.value,
                timeOfSession: timeOfSession.value,
                buildingRoomNumber: buildingRoomNumber.value,
                mentor: auth.userId
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        navigate(`/${auth.userId}/dashboard`);
    }

    return (
        <>
            <div className='formContainer'>
                <div className='subFormContainer'>
                    <form className='formDetails'>
                        <label htmlFor='courseName'>Course Name</label>
                        <input id='courseName' type='text' />
                        <label htmlFor='courseSection'>Course Section</label>
                        <input id='courseSection' type='text' />
                        <label htmlFor='timeOfSession'>Time of Session</label>
                        <input id='timeOfSession' type='text' />
                        <label htmlFor='buildingRoomNumber'>Location</label>
                        <input id='buildingRoomNumber' type='text' />
                        <button onClick={createSectionHandler}>CREATE SECTION</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SectionForm