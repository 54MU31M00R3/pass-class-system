import React from 'react';

import SectionItem from './SectionItem';

function SectionsList({ loadedSections }) {
    return (
        <>
            {loadedSections.map((section) => {
                return <SectionItem
                    key={section.sectionId}
                    courseName={section.courseName}
                    courseSection={section.courseSection}
                    timeOfSession={section.timeOfSession}
                    buildingRoomNumber={section.buildingRoomNumber}
                />
            })}
        </>
    )
}

export default SectionsList