import React from 'react';

import SectionsList from '../components/SectionsList';

import sections from '../dummySections.json';

function Sections() {
    const DUMMY_DATA = sections;
    return (
        <SectionsList loadedSections={DUMMY_DATA}/>
    )
}

export default Sections