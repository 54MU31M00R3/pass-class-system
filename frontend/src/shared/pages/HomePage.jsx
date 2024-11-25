import React from 'react';

import SectionsList from '../components/SectionsList';

import sections from '../../assets/dummyData/sections.json';

function HomePage() {
    const DUMMY_DATA = sections;
    return (
        <SectionsList loadedSections={DUMMY_DATA}/>
    )
}

export default HomePage;