import React from 'react'

import annoucements from '../../assets/dummyData/announcement.json'

function Announcement({ content }) {
  const announcement = annoucements.find(announcement => announcement.contentId == content.contentId)

  return (
    <>
      <ul className='contentHeader'>
        <li>{content.title}</li>
        <li>{content.datePosted}</li>
      </ul>
      <div className='announcement'>
        {announcement.text}
      </div>
    </>
  )
}

export default Announcement