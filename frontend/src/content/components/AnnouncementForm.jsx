import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import content from '../../assets/dummyData/content.json';
import announcements from '../../assets/dummyData/announcement.json';

function AnnouncementForm({ formToggler }) {
    const auth = useContext(AuthContext);
    const sectionId = useParams().sectionId;
    const navigate = useNavigate();

    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }

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
            <div className='formContainer'>
                <div className='subFormContainer'>
                    <form className='formDetails'>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' />
                        <label htmlFor='announcement'>Announcement</label>
                        <textarea id='announcement'/>
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