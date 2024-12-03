import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { toast } from 'react-toastify';

// this component holds the form which the user can submit
// to create an announcement. 

function AnnouncementForm({ formToggler }) {
    // tailwind css
    const labelClass = 'text-lg font-medium';
    const formInput = 'flex flex-col pb-5';
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';
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
    // on submit handler for a post request for an announcement 
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

        toast.success('Announcement Posted');

        return navigate(`/${sectionId}/section`);
    }

    return (
        <>
            {/* form which accepts details for worksheet, including a title and file */}
            <div className='w-full flex justify-center text-center pt-5'>
                <div className='flex flex-col justify-between h-full  w-96 text-center rounded-md shadow-lg border-2 bg-gray-100'>
                    <h1 className='text-3xl font-black text-red-600 pt-5'>
                        Announcement
                    </h1>
                    <div className='flex justify-around pb-10'>
                        <div className='flex flex-col gap-5 text-left w-64 pt-8'>
                            <form className=''>
                                <div className={formInput}>
                                    <label className={labelClass} htmlFor='title'>Title</label>
                                    <input id='title' type='text' />
                                </div>
                                <div className={formInput}>
                                    <label className={labelClass} htmlFor='announcement'>Announcement</label>
                                    <textarea id='announcement' />
                                </div>
                                <div className='flex flex-col'><button className={buttonClass} onClick={announcementSubmit}>Post</button></div>
                            </form>
                            <div className={formInput}>
                                <label className={labelClass} htmlFor='selectedmode'>Select Upload Type</label>
                                <select name="selectedmode" onChange={contentModeHandler} defaultValue="Announcement">
                                    <option disabled>Announcement</option>
                                    <option value="worksheet">Worksheet</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnnouncementForm;