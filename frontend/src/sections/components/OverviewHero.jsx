import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

function OverviewHero({ sectionId, courseName, courseSection, timeOfSession, buildingRoomNumber, mentor, isEnroled}) {
    // tailwind css
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';
    // tracks user credentials
    const auth = useContext(AuthContext);
    // tracks loading state
    const [isLoading, setIsLoading] = useState();
    // tracks loaded user
    const [loadedMentor, setLoadedMentor] = useState();

    // get request for user that is a mentor
    useEffect(() => {
        const fetchMentor = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/users/user/${mentor}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setLoadedMentor(responseData.user);
            setIsLoading(false);
        }
        fetchMentor();

    }, [])

    return (
        <>
            {/* once loading has complete and there exists a corresponding mentor component is rendered */}
            {!isLoading && loadedMentor && <div className=' bg-red-600 h-96 flex flex-col justify-around text-center'>
                <div className='flex justify-center font-black'>
                    <div className='flex flex-col justify-between h-72 w-5/6 bg-white rounded-lg shadow-md text-2xl'>
                        <div className='flex justify-between pt-10 pr-10 pl-10'>
                            <div className='text-start'>
                                <div>Welcome to PASS for {courseName}</div>
                            </div>
                            <div className='text-end'>
                                <div>Time: {timeOfSession}</div>
                                <div>Location: {buildingRoomNumber}</div>

                            </div>
                        </div>
                        <div className='flex justify-between pb-10 pr-10 pl-10'>
                            <div className='text-start'>
                                <div>Pass Leader Info</div>
                                <div>{loadedMentor.email}</div>
                                <div>{loadedMentor.username}</div>
                            </div>
                            <div className='flex text-end self-end gap-10'>
                                {/* if the user is a mentor they have access to these buttons */}
                                {(auth.userId == mentor) && <Link className={buttonClass} to={`/${sectionId}/section/content/upload`}>Upload Content</Link>}
                                {auth.userId == mentor && <button className={buttonClass}>Delete Section</button>}
                                {/* if the current user is not this sections mentor and they are enroled they can access this button */}
                                {!(auth.userId == mentor) && isEnroled && <button className={buttonClass}>Log Attendance</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default OverviewHero