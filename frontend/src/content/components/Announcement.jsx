import React from 'react'

import annoucements from '../../assets/dummyData/announcement.json'

function Announcement({ content }) {
  const announcement = annoucements.find(announcement => announcement.contentId == content.contentId)

  return (
    <>
      <ul>
        <li>{content.title}</li>
        <li>{content.datePosted}</li>
      </ul>
      <div>
        {announcement.text}
      </div>
    </>
  )
}

export default Announcement