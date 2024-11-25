import React from 'react';

import worksheets from '../../../assets/dummyData/worksheet.json'

function Worksheet({ content }) {
  const worksheet = worksheets.find(worksheet => worksheet.contentId == content.contentId)

  const worksheetLinkHandler = (event) => {
    event.preventDefault();
    console.log(worksheet.filePath)
  }

  return (
    <>
      <div>
        <ul>
          <li>{content.title}</li>
          <li>{content.datePosted}</li>
        </ul>
        <a onClick={worksheetLinkHandler} href={worksheet.filePath}>View Worksheet</a>
      </div>
    </>
  )
}

export default Worksheet