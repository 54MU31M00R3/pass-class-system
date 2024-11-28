import React from 'react'

import Announcement from '../../content/components/Announcement';
import Worksheet from '../../content/components/Worksheet';

import content from '../../assets/dummyData/content.json'

function SectionContent({ sectionId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedContent, setLoadedContent] = useState();

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
      {!isLoading && loadedContent && loadedContent.map(content => {
        if (content.contentType === 'worksheet') {
          return <Worksheet key={content.contentId} content={content} />
        } else if (content.contentType === 'announcement') {
          return <Announcement key={content.contentId} content={content} />
        }
      })}
    </>
  )
}

export default SectionContent