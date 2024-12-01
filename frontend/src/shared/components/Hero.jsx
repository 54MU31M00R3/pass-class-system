import React from 'react';
import { NavLink } from 'react-router-dom';

function Hero() {
    const cardClass = 'w-96 flex flex-col gap-5 bg-white p-4 p-6 rounded-lg shadow-md text-left text-2xl';
    const cardTextClass = 'text-left text-lg'
    return (
        <>
            <div className=' bg-red-600 h-80 flex flex-col justify-center text-center'>
                <div className='flex flex-col gap-20'>
                    <h2 className='text-white text-4xl font-black'>
                        Elevate Your Studies with Expert Resources
                    </h2>
                    <div className='flex justify-center gap-20'>
                        <div className={cardClass}>
                            <div>Peer Assisted Study Sessions</div>
                            <p className={cardTextClass}>Get help from students who have excelled in your courses</p>
                        </div>
                        <div className={cardClass}>
                            <div>Exam Review and Preparation</div>
                            <p className={cardTextClass}>Review and consolidate key course concepts</p>
                        </div>
                        <div className={cardClass}>
                            <div>Stay in the Loop</div>
                            <p className={cardTextClass}>Get notified of upcoming campus events such as skills workshops</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero