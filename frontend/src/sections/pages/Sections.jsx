import React from 'react';

import sections from '../dummySections.json';

function Sections() {
    const DUMMY_DATA = sections;
    return (
        <>
            {DUMMY_DATA.map((section) => (
                <ul>
                    <li>{section.courseName}</li>
                    <li>{section.courseSection}</li>
                    <li>{section.timeOfSession}</li>
                    <li>{section.buildingRoomNumber}</li>
                </ul>
            ))}
        </>
    )
}

export default Sections