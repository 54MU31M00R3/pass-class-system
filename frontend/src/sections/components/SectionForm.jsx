import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

// this component will accept data from a user that
// is a pass leader and send a post request to the
// backend to create a new section

function SectionForm() {
    // tracks user credentials
    const auth = useContext(AuthContext);
    // forces the user to go to a specific url
    const navigate = useNavigate();

    // on submit function attached to the form element
    const createSectionHandler = async (event) => {
        // prevent default behaviour of reloading the page
        event.preventDefault();

        // sends post request to backend
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
            {/* layout to accept input from user to make sections */}
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