import React from 'react'

import annoucements from '../../assets/dummyData/announcement.json'

function Announcement({ content }) {  
  const [isLoading, setIsLoading] = useState(false);
  const [loadedAnnouncement, setLoadedAnnouncement] = useState();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/announcement/${sectionId}`);

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
          <li>{content.datePosted}</li>
        </ul>
        <div className='announcement'>
          {loadedAnnouncement.body}
        </div>
      </div>}
    </>
  )
}

export default Announcement