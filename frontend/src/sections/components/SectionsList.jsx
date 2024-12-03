import React from 'react';

import SectionItem from './SectionItem';

import '../styles/Sections.css';

// this component receives a list of sections
// and maps them out to a the SectionItem component
// to display their details on a card that will be 
// sent to the homepage or dashboard

function SectionsList({ loadedSections }) {
    return (
        <>
            <div className='w-screen'>
                <div className='flex justify-center w-full'>
                    <div className='flex flex-wrap justify-evenly w-full'>
                        {loadedSections.map((section) => {
                            return <SectionItem
                                key={section.id}
                                sectionId={section.id}
                                courseName={section.courseName}
                                courseSection={section.courseSection}
                                timeOfSession={section.timeOfSession}
                                buildingRoomNumber={section.buildingRoomNumber}
                                mentor={section.mentor}
                            />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionsList;