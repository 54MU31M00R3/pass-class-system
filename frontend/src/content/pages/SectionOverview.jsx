import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionContent from '../components/SectionContent';
import sections from '../../assets/dummyData/sections.json';
import { AuthContext } from '../../shared/context/auth-context';

function Section() {
    const auth = useContext(AuthContext);
    const sectionId = useParams().sectionId;

    const section = sections.find(section => section.sectionId == sectionId);

    return (
        <>
            <div className="contentContainer">
                {(auth.userId == section.mentorId) && <Link className='uploadLink' to={`/${sectionId}/section/content/upload`}>Upload Content</Link>}
                <SectionContent sectionId={sectionId} />
            </div>
        </>
    )
}

export default Section