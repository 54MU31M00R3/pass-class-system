import React, { useState, useEffect } from 'react'

import Announcement from '../../content/components/Announcement';
import Worksheet from '../../content/components/Worksheet';

// component used to retrieve content such as announcements
// and worksheets to be displayed on the section overview page

function SectionContent({ sectionId }) {
  // tracks loading state of content
  const [isLoading, setIsLoading] = useState(false);
  // used to set content once retrieved from backend
  const [loadedContent, setLoadedContent] = useState();

  // used to send get request 
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/${sectionId}`);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedContent(responseData.content);
      setIsLoading(false);
    }
    fetchContent();

  }, [])

  return (
    <>
      {/* will display content only if the content has been loaded and exists 
          however the content must first be processed by their respective components*/}
      {!isLoading && loadedContent && loadedContent.map(content => {
        if (content.contentType === 'worksheet') {
          return <Worksheet key={content.id} content={content} />
        } else if (content.contentType === 'announcement') {
          return <Announcement key={content.id} content={content} />
        }
      })}
    </>
  )
}

export default SectionContent