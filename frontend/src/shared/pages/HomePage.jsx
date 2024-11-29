import React, { useEffect, useState } from 'react';

import SectionsList from '../../sections/components/SectionsList';

// this component allows users to view all currently available pass sections

function HomePage() {
    // tracks if content is loaded before displaying anything
    const [isLoading, setIsLoading] = useState(false);
    // used to store data fetched from the backend
    const [loadedSections, setLoadedSections] = useState();

    // get request to backend for all sections
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
            {/* once the data has been fetched and if there is any data at all this component will be loaded */}
            {!isLoading && loadedSections && <SectionsList loadedSections={loadedSections} />}
        </>
    )
}

export default HomePage;