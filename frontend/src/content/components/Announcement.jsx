import React, { useState, useEffect } from 'react'

import annoucements from '../../assets/dummyData/announcement.json'

function Announcement({ content }) {  
  const [isLoading, setIsLoading] = useState(false);
  const [loadedAnnouncement, setLoadedAnnouncement] = useState();
  const datePosted = new Date(content.datePosted).toDateString();


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
      {!isLoading && loadedAnnouncement && <div>
        <ul className='contentHeader'>
          <li>{content.title}</li>
          <li>{datePosted}</li>
        </ul>
        <div className='announcement'>
          {loadedAnnouncement.body}
        </div>
      </div>}
    </>
  )
}

export default Announcement