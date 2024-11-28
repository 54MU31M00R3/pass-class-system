import React, { useState, useEffect } from 'react';

import worksheets from '../../assets/dummyData/worksheet.json'

function Worksheet({ content }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedWorksheet, setLoadedWorksheet] = useState();
  const datePosted = new Date(content.datePosted).toDateString();

  useEffect(() => {
    const fetchWorksheet = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/worksheet/${content.id}`);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedWorksheet(responseData.worksheet);
      setIsLoading(false);
    }
    fetchWorksheet();

  }, [])

  const worksheetLinkHandler = (event) => {
    event.preventDefault();
    console.log(loadedWorksheet.filePath)
  }

  return (
    <>
      {!isLoading && loadedWorksheet && <div>
        <ul className='contentHeader'>
          <li>{content.title}</li>
          <li>{datePosted}</li>
        </ul>
        <a className='worksheet' onClick={worksheetLinkHandler} href={loadedWorksheet.filePath}>View Worksheet</a>
      </div>}
    </>
  )
}

export default Worksheet