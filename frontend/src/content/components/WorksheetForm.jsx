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

    const worksheetSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/content/worksheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section: sectionId,
                contentType: 'worksheet',
                title: title.value,
                mentor: auth.userId,
                filePath: 'files/worksheet1'
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
        
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