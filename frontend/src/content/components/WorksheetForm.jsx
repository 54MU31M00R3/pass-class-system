import React from 'react';

function WorksheetForm({ formToggler }) {
    const contentModeHandler = (event) => {
        event.preventDefault();

        const mode = event.target.value;
        formToggler(mode);
    }

    const worksheetSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <div className='formContainer'>
                <div className='annForm'>
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