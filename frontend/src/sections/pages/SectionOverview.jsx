import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionContent from '../components/SectionContent';
import { AuthContext } from '../../shared/context/auth-context';
import OverviewHero from '../components/OverviewHero';


// this component will provide a view of all content
// related to a section such as workhsheets and announcements

function SectionOverview() {
    // tracks user credentials
    const auth = useContext(AuthContext);
    // gets sectionId from the url
    const sectionId = useParams().sectionId;

    // tracks loading status of content
    const [isLoading, setIsLoading] = useState(false);
    // used to set loaded section from get request
    const [loadedSection, setLoadedSection] = useState();

    // get request for section
    useEffect(() => {
        const fetchSection = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/sections/section/${sectionId}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setLoadedSection(responseData.section);
            setIsLoading(false);
        }
        fetchSection();

    }, [])

    return (
        <>
            {!isLoading && loadedSection && <div className="">
                <OverviewHero
                    sectionId={loadedSection.id}
                    courseName={loadedSection.courseName}
                    courseSection={loadedSection.courseSection}
                    timeOfSession={loadedSection.timeOfSession}
                    buildingRoomNumber={loadedSection.buildingRoomNumber}
                    mentor={loadedSection.mentor}
                />
                <SectionContent sectionId={sectionId} />
            </div>}
        </>
    )
}

export default SectionOverview