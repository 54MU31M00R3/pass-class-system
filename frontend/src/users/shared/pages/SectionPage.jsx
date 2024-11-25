import React from 'react';
import { useParams } from 'react-router-dom';

import SectionItem from '../components/SectionItem';
import sections from '../../../assets/dummySections.json';

function Section() {
    const sectionId = useParams().sectionId;

    const section = sections.find(section => section.sectionId == sectionId);

    return (
        <SectionItem
            courseName={section.courseName}
            courseSection={section.courseSection}
            timeOfSession={section.timeOfSession}
            buildingRoomNumber={section.buildingRoomNumber}
        />
    )
}

export default Section