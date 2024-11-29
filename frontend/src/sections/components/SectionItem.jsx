import React, { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

import { Link } from 'react-router-dom';

// this component receives sections details from 
// the SectionList component and styles them to 
// be viewed on the homepage or dashboard

function SectionItem({ sectionId, courseName, courseSection, timeOfSession, buildingRoomNumber }) {
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
                <Link className='sectionLink' to={auth.isLoggedIn && `/${sectionId}/section` || !auth.isLoggedIn && '/login'}>VIEW</Link>
            </div>
        </ul>
    )
}

export default SectionItem;