import React, { useState } from 'react';

import AnnouncementForm from '../components/AnnouncementForm';
import WorksheetForm from '../components/WorksheetForm';

import '../../shared/styles/Forms.css';

function UploadContent() {
    const [contentMode, setContentMode] = useState('announcement')

    const contentModeHandler = (mode) => {
        setContentMode(mode);
    }

    if (contentMode === 'announcement') {
        return <AnnouncementForm formToggler={contentModeHandler}/>
    } else if (contentMode === 'worksheet'){
        return <WorksheetForm formToggler={contentModeHandler}/>
    }
}

export default UploadContent;