import React from 'react'

import Announcement from '../../content/components/Announcement';
import Worksheet from '../../content/components/Worksheet';

import content from '../../assets/dummyData/content.json'

function SectionContent({ sectionId }) {
  const filteredContent = content.filter(content => content.sectionId == sectionId)

  return (
    <>
      {filteredContent.map(content => {
        if (content.contentType === 'worksheet') {
          return <Worksheet key={content.contentId} content={content}/>
        } else if (content.contentType === 'announcement') {
          return <Announcement key={content.contentId} content={content}/>
        }
      })}
    </>
  )
}

export default SectionContent