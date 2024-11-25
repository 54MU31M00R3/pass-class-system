import React from 'react';

import SectionsList from '../components/SectionsList';

import sections from '../../../assets/dummySections.json';

function HomePage() {
    const DUMMY_DATA = sections;
    return (
        <SectionsList loadedSections={DUMMY_DATA}/>
    )
}

export default HomePage;