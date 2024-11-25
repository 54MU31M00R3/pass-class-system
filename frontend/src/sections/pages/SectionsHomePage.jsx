import React from 'react';

import SectionsList from '../components/SectionsList';

import sections from '../dummySections.json';
import '../styles/Sections.css';

function SectionsHomePage() {
    const DUMMY_DATA = sections;
    return (
        <SectionsList loadedSections={DUMMY_DATA}/>
    )
}

export default Sections