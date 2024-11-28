import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionContent from '../components/SectionContent';
import sections from '../../assets/dummyData/sections.json';
import { AuthContext } from '../../shared/context/auth-context';

function SectionOverview() {
    const auth = useContext(AuthContext);
    const sectionId = useParams().sectionId;

    const [isLoading, setIsLoading] = useState(false);
    const [loadedSection, setLoadedSection] = useState();

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