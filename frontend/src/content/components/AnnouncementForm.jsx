import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

// this component holds the form which the user can submit
// to create an announcement. 

function AnnouncementForm({ formToggler }) {
    // tracks user credentials
    const auth = useContext(AuthContext);
    // accesses section id from the url
    const sectionId = useParams().sectionId;
    // used to send the user to another url
    const navigate = useNavigate();

    // wrapper for dropdown submit, that 
    // accesses the desired type of form
    // and send a request to toggle the currently
    // viewed form component
    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }
    // on submit handler of a post request for an announcement 
    const announcementSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/content/announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section: sectionId,
                contentType: 'announcement',
                title: title.value,
                mentor: auth.userId,
                body: announcement.value
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
            {/* form which accepts details for worksheet, including a title and file */}
            <div className='formContainer'>
                <div className='subFormContainer'>
                    <form className='formDetails'>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' />
                        <label htmlFor='announcement'>Announcement</label>
                        <textarea id='announcement' />
                        <button onClick={announcementSubmit}>Post</button>
                    </form>
                    <label htmlFor='selectedmode'>Select Upload Type</label>
                    <select name="selectedmode" onChange={contentModeHandler} defaultValue="Announcement">
                        <option disabled>Announcement</option>
                        <option value="worksheet">Worksheet</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default AnnouncementForm;