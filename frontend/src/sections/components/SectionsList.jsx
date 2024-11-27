import React from 'react';

import SectionItem from './SectionItem';

import '../styles/Sections.css';

function SectionsList({ loadedSections }) {
    return (
        <>
            <div className='sectionsContainer'>
                {loadedSections.map((section) => {
                    return <SectionItem
                        key={section.id}
                        sectionId={section.id}
                        courseName={section.courseName}
                        courseSection={section.courseSection}
                        timeOfSession={section.timeOfSession}
                        buildingRoomNumber={section.buildingRoomNumber}
                    />
                })}
            </div>
        </>
    )
}

export default SectionsList;