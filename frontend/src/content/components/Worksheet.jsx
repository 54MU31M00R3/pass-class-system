import React from 'react';

import worksheets from '../../assets/dummyData/worksheet.json'

function Worksheet({ content }) {
  const worksheet = worksheets.find(worksheet => worksheet.contentId == content.contentId)

  const worksheetLinkHandler = (event) => {
    event.preventDefault();
    console.log(worksheet.filePath)
  }

  return (
    <>
        <ul className='contentHeader'>
          <li>{content.title}</li>
          <li>{content.datePosted}</li>
        </ul>
        <a className='worksheet' onClick={worksheetLinkHandler} href={worksheet.filePath}>View Worksheet</a>
    </>
  )
}

export default Worksheet