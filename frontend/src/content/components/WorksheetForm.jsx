import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import content from '../../assets/dummyData/content.json';
import worksheets from '../../assets/dummyData/worksheet.json';

function WorksheetForm({ formToggler }) {
    const sectionId = useParams().sectionId;
    const navigate = useNavigate();
    
    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }

    const worksheetSubmit = (event) => {
        event.preventDefault();

        const contentId = Math.floor(Math.random() * 100);

        const currentDate = new Date().toDateString();

        const newContent = {
            contentId: contentId,
            sectionId: sectionId,
            contentType: 'worksheet',
            title: title.value,
            datePosted: currentDate
        }

        const newAnnouncement = {
            contentId: contentId,
            contentType: 'worksheet',
            filePath: 'placeholderPath'
        }

        content.push(newContent);
        worksheets.push(newAnnouncement);
        navigate(`/${sectionId}/section`);
    }
    return (
        <>
            <div className='formContainer'>
                <div className='subFormContainer'>
                    <form className='formDetails'>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' />
                        <label htmlFor='worksheet'>Worksheet</label>
                        <input id='worksheet' type='file' />
                        <button onClick={worksheetSubmit}>Upload</button>
                    </form>
                    <label htmlFor='selectedmode'>Select Upload Type</label>
                    <select name="selectedmode" onChange={contentModeHandler} defaultValue="Worksheet">
                        <option disabled>Worksheet</option>
                        <option value="announcement">Announcement</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default WorksheetForm