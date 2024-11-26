import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import sections from '../../assets/dummyData/sections.json';

function SectionForm() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const createSectionHandler = (event) => {
        event.preventDefault();

        const newSection = {
            sectionId: Math.floor(Math.random() * 100),
            courseName: courseName.value,
            courseSection: courseSection.value,
            timeOfSession: timeOfSession.value,
            buildingRoomNumber: buildingRoomNumber.value,
            studentIds: [],
            mentorId: auth.userId
        }

        sections.push(newSection);

        navigate('/')
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