import React, { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

import { Link } from 'react-router-dom';

function SectionItem({ id, courseName, courseSection, timeOfSession, buildingRoomNumber }) {
    const auth = useContext(AuthContext);

    return (
        <ul className='sectionInfo'>
            <div className="upperInfo">
                <li>{courseName}</li>
                <li>{courseSection}</li>
            </div>
            <div className="lowerContainer">
                <div className="lowerInfo">
                    <li>Time: {timeOfSession}</li>
                    <li>Location: {buildingRoomNumber}</li>
                </div>
                <Link className='sectionLink' to={auth.isLoggedIn && `/${id}/section` || !auth.isLoggedIn && '/login'}>VIEW</Link>
            </div>
        </ul>
    )
}

export default SectionItem;