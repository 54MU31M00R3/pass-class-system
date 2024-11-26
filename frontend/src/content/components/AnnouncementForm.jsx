import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import content from '../../assets/dummyData/content.json';
import announcements from '../../assets/dummyData/announcement.json';

function AnnouncementForm({ formToggler }) {
    const sectionId = useParams().sectionId;
    const navigate = useNavigate();

    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }

    const announcementSubmit = (event) => {
        event.preventDefault();

        const contentId = Math.floor(Math.random() * 100);

        const newContent = {
            contentId: contentId,
            sectionId: sectionId,
            contentType: 'announcement',
            title: title.value,
            datePosted: new Date()
        }

        const newAnnouncement = {
            contentId: contentId,
            contentType: 'announcement',
            text: text.value
        }

        content.push(newContent);
        announcements.push(newAnnouncement);
        navigate(`/${sectionId}/section`);
    }

    return (
        <>
            <div className='formContainer'>
                <div className='annForm'>
                    <form className='formDetails'>
                        <label htmlFor='title'>Title</label>
                        <input id='title' type='text' />
                        <label htmlFor='announcement'>Announcement</label>
                        <input id='announcement' type='textarea' />
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