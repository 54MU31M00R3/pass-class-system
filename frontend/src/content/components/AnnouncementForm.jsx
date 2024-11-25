import React from 'react';

function AnnouncementForm({ formToggler }) {
    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }

    const announcementSubmit = (event) => {
        event.preventDefault();
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