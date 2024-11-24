import React from 'react'

function SectionItem({ courseName, courseSection, timeOfSession, buildingRoomNumber }) {
    return (
        <ul className='sectionInfo'>
            <li>{courseName}</li>
            <li>{courseSection}</li>
            <li>{timeOfSession}</li>
            <li>{buildingRoomNumber}</li>
        </ul>
    )
}

export default SectionItem