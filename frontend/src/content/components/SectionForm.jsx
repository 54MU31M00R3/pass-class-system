import React from 'react'

function SectionForm() {

    const createSectionHandler = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='formContainer'>
                <div className='secForm'>
                    <form className='formDetails'>
                        <label htmlFor='courseName'>Course Name</label>
                        <input id='courseName' type='text' />
                        <label htmlFor='courseSection'>Course Section</label>
                        <input id='courseSection' type='text' />
                        <label htmlFor='timeOfSession'>Time of Session</label>
                        <input id='timeOfSession' type='text' />
                        <label htmlFor='buildingRoomNumber'>Location</label>
                        <input id='buildingRoomNumber' type='text' />
                        <button onClick={createSectionHandler}>CREATE SECTION</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SectionForm