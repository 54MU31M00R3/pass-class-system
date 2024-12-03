import React, { useState, useEffect } from 'react'

// component that accepts a content object and
// finds the related worksheet through its ids
// then returns the details for the worksheet 

function Announcement({ content }) {
  // keeps track of the announcement loading state
  const [isLoading, setIsLoading] = useState(false);
  // used to set the announcement once loaded
  const [loadedAnnouncement, setLoadedAnnouncement] = useState();
  // formats date from retrieved content to be displayed in a user friendly manner
  const datePosted = new Date(content.datePosted).toDateString();

  // get request for specific announcement details
  useEffect(() => {
    const fetchAnnouncement = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/announcement/${content.id}`);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedAnnouncement(responseData.announcement);
      setIsLoading(false);
    }
    fetchAnnouncement();

  }, [])

  return (
    <>
      {/* upon loading and existing the content's details will be displayed along
          with its associated announcements details */}
      <div className='flex justify-center h-48 text-lg'>
        {/* once loading is complete and there exists an announcement with a corresponding content ID this component will be rendered */}
        {!isLoading && loadedAnnouncement && <div className='flex flex-col justify-between h-42 w-1/2 mt-5 p-8 shadow-md rounded-lg bg-gray-100'>
          <ul className='flex justify-between'>
            <li className='font-black'>{content.title}</li>
            <li className='font-black'>{datePosted}</li>
          </ul>
          <div>
            {loadedAnnouncement.body}
          </div>
        </div>}
      </div>
    </>
  )
}

export default Announcement