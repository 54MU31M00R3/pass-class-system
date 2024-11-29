import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionContent from '../components/SectionContent';
import sections from '../../assets/dummyData/sections.json';
import { AuthContext } from '../../shared/context/auth-context';

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
            {!isLoading && loadedSection && <div className="contentContainer">
                {(auth.userId == loadedSection.mentor) && <Link className='uploadLink' to={`/${sectionId}/section/content/upload`}>Upload Content</Link>}
                <SectionContent sectionId={sectionId} />
            </div>}
        </>
    )
}

export default SectionOverview