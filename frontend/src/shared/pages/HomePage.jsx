import React, { useEffect, useState } from 'react';

import SectionsList from '../../sections/components/SectionsList';

import sections from '../../assets/dummyData/sections.json';

function HomePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedSections, setLoadedSections] = useState();

    useEffect(() => {
        const fetchSections = async () => {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/sections');

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setLoadedSections(responseData.sections)
            setIsLoading(false);
        }
        fetchSections();
    }, [])

    return (
        <>
            { !isLoading && loadedSections && <SectionsList loadedSections={loadedSections} />}
        </>
    )
}

export default HomePage;