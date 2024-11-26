import React from 'react';

import { Link } from 'react-router-dom';

function SectionItem({ id, courseName, courseSection, timeOfSession, buildingRoomNumber }) {
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
                <Link className='sectionLink' to={`/${id}/section`}>VIEW</Link>
            </div>
        </ul>
    )
}

export default SectionItem