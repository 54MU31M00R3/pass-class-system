import React, { useState } from 'react';

import AnnouncementForm from '../components/AnnouncementForm';
import WorksheetForm from '../components/WorksheetForm';

// this component will render either an announcement form
// or worksheet form that will be used to send a post request to
// the backend

function UploadContent() {
    // use to determine what kind of form the user wants to submit
    // by default set to announcement since the worksheet form hasn't
    // fully been implemented yet
    const [contentMode, setContentMode] = useState('announcement')

    // function sent to each form that can be controlled by a dropdown to 
    // select the type of form the user wishes to submit
    const contentModeHandler = (mode) => {
        setContentMode(mode);
    }

    // depending on the selected content mode the respective form will be sent 
    if (contentMode === 'announcement') {
        return <AnnouncementForm formToggler={contentModeHandler}/>
    } else if (contentMode === 'worksheet'){
        return <WorksheetForm formToggler={contentModeHandler}/>
    }
}

export default UploadContent;