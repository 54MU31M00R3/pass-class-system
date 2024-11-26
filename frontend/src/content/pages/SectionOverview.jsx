import React from 'react';
import { useParams } from 'react-router-dom';

import SectionItem from '../../shared/components/SectionItem';
import SectionContent from '../components/SectionContent';
import sections from '../../assets/dummyData/sections.json';

function Section() {
    const sectionId = useParams().sectionId;

    const section = sections.find(section => section.sectionId == sectionId);

    return (
        <>
            <div className="contentContainer">
                <SectionContent sectionId={sectionId}/>
            </div>
        </>
    )
}

export default Section