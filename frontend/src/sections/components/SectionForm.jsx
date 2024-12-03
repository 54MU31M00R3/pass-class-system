import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { toast } from 'react-toastify';

// this component will accept data from a user that
// is a pass leader and send a post request to the
// backend to create a new section

function SectionForm() {
    // tailwind css classes
    const labelClass = 'text-lg font-medium';
    const formInput = 'flex flex-col pb-5';
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';
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

        toast.success('Section Created');

        return navigate(`/${auth.userId}/dashboard`);
    }

    return (
        <>
            {/* layout to accept input from user to make sections */}
            <div className='w-full flex justify-center text-center pt-5'>
                <div className='flex flex-col justify-between h-full  w-96 text-center rounded-md shadow-lg border-2 bg-gray-100'>
                    <h1 className='text-3xl font-black text-red-600 pt-5'>
                        Section
                    </h1>
                    <div className='flex justify-around pb-10'>
                        <form className='flex flex-col gap-5 text-left w-64 pt-8' onSubmit={createSectionHandler}>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='courseName'>Course Name</label>
                                <input id='courseName' type='text' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='courseSection'>Course Section</label>
                                <input id='courseSection' type='text' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='timeOfSession'>Time of Session</label>
                                <input id='timeOfSession' type='text' />
                            </div>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='buildingRoomNumber'>Location</label>
                                <input id='buildingRoomNumber' type='text' />
                            </div>
                            <div className='flex flex-col'>
                                <button className={buttonClass} type='submit'>Create Section</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionForm