import React from 'react'

import Announcement from './Announcement';
import Worksheet from './Worksheet';

import content from '../../../assets/dummyData/content.json'

function SectionContent({ sectionId }) {
  const filteredContent = content.filter(content => content.sectionId == sectionId)

  return (
    <>
      {filteredContent.map(content => {
        if (content.contentType === 'worksheet') {
          return <Worksheet content={content}/>
        } else if (content.contentType === 'announcement') {
          return <Announcement content={content}/>
        }
      })}
    </>
  )
}

export default SectionContent