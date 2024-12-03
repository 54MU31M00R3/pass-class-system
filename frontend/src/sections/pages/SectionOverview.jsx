import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionContent from '../components/SectionContent';
import { AuthContext } from '../../shared/context/auth-context';
import OverviewHero from '../components/OverviewHero';
import { toast } from 'react-toastify';


// this component will provide a view of all content
// related to a section such as workhsheets and announcements

function SectionOverview() {
    const buttonClass = 'text-lg bg-red-600 text-white rounded-md px-3 py-2';
    // tracks user credentials
    const auth = useContext(AuthContext);
    const userId = auth.userId;
    // gets sectionId from the url
    const sectionId = useParams().sectionId;
    // tracks loading status of content
    const [isLoading, setIsLoading] = useState(false);
    // used to set loaded section from get request
    const [loadedSection, setLoadedSection] = useState();
    const [isEnroled, setIsEnroled] = useState(false);
    const [enrolmentCheck, setEnrolmentCheck] = useState(null);

    // get request for section
    useEffect(() => {
        const fetchSection = async () => {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/sections/section/${sectionId}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setLoadedSection(responseData.section);
            setIsLoading(false);
        }
        fetchSection();
        setEnrolmentCheck(true);
    }, [])

    useEffect(() => {
        if (loadedSection) {
            const enroledStudent = loadedSection.students.find((student) => (student == userId));

            if (enroledStudent) {
                setIsEnroled(true);
            } else {
                setIsEnroled(false)
            }
        } 
        
    }, [loadedSection])

    const enrolSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/sections/section/${sectionId}/user/${userId}`);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsEnroled(true);
            toast.success(`You have Enroled in ${loadedSection.courseName}`)

        } catch (error) {
            console.log(error)
            toast.error('Enrolment Failed');
        }
    }


    return (
        <>
            {(!isLoading && loadedSection) && <div>
                <OverviewHero
                    sectionId={loadedSection.id}
                    courseName={loadedSection.courseName}
                    courseSection={loadedSection.courseSection}
                    timeOfSession={loadedSection.timeOfSession}
                    buildingRoomNumber={loadedSection.buildingRoomNumber}
                    mentor={loadedSection.mentor}
                    isEnroled={isEnroled}
                />
                {(isEnroled || (auth.userId == loadedSection.mentor)) && <SectionContent sectionId={sectionId} />}
                {(!isEnroled || (!isEnroled && !(auth.userId == loadedSection.mentor))) && <div className='flex justify-center h-44'>
                    <div className='bg-gray-100 mt-10 w-1/2 h-full rounded-lg shadow-md border-2'>
                        <div className='flex justify-center h-full'>
                            <div className='flex flex-col h-full justify-around'>
                                <div className='text-2xl'>
                                    Please Enrol Before Viewing Section Content
                                </div>
                                <button className={`${buttonClass} w-32 self-center`} onClick={enrolSubmit}>
                                    Enrol Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>}
        </>
    )
}

export default SectionOverview