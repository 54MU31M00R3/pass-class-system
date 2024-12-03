import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

import { NavLink } from 'react-router-dom';

// this component receives sections details from 
// the SectionList component and styles them to 
// be viewed on the homepage or dashboard

function SectionItem({ sectionId, courseName, courseSection, timeOfSession, buildingRoomNumber, mentor }) {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState();
    const [loadedMentor, setLoadedMentor] = useState();
    const headerText = 'text-lg font-black mr-1';
    const detailText = 'text-lg';


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
            {/* once loading has completed and there exists a mentor for a section a clickable card/link with pass info will be generated */}
            {!isLoading && loadedMentor && <NavLink className='w-1/2 m-10 p-10 shadow-md rounded-lg bg-gray-100'
                to={auth.isLoggedIn && `/${sectionId}/section` || !auth.isLoggedIn && '/login'}>
                <ul className='flex flex-col'>
                    <div className="flex justify-between">
                        <li className='flex'><div className={headerText}>Course Name:</div> <div className={detailText}>{courseName}</div></li>
                        <li className='flex'><div className={headerText}>Session Time:</div> <div className={detailText}>{timeOfSession}</div></li>
                    </div>
                    <div className='flex justify-between items-stretch'>
                        <div className="flex flex-col justify-between h-24">
                            <li className='flex'><div className={headerText}>Section: </div><div className={detailText}>{courseSection}</div></li>
                            <li className='flex'><div className={headerText}>Location: </div><div className={detailText}>{buildingRoomNumber}</div></li>
                        </div>
                        <div className=' flex self-end'><div className={headerText}>Pass Leader:</div><div className={detailText}> {loadedMentor.username}</div></div>
                    </div>

                </ul>
            </NavLink>}
        </>
    )
}

export default SectionItem;