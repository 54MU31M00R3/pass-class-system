import React, { useState, useEffect } from 'react';

// component that accepts a content object and
// finds the related worksheet through its ids
// then returns the details for the worksheet 

function Worksheet({ content }) {
  // keeps track of the worksheets loading state
  const [isLoading, setIsLoading] = useState(false);
  // used to set the worksheet once loaded
  const [loadedWorksheet, setLoadedWorksheet] = useState();
  // formats date from retrieved content to be displayed in a user friendly manner
  const datePosted = new Date(content.datePosted).toDateString();

  // get request for specific worksheet details
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

  // placeholder for on click behaviour for accessing worksheet
  const worksheetLinkHandler = (event) => {
    event.preventDefault();
    console.log(loadedWorksheet.filePath)
  }

  return (
    <>
      {/* upon loading and existing the content's details will be displayed along
          with its associated worksheets details */}
      <div className='flex justify-center h-48 text-lg'>
        {!isLoading && loadedWorksheet && <div className='flex flex-col justify-between h-42 w-1/2 mt-5 p-8 shadow-md rounded-lg bg-gray-100'>
          <ul className='flex justify-between'>
            <li className='font-black'>{content.title}</li>
            <li className='font-black'>{datePosted}</li>
          </ul>
          <a onClick={worksheetLinkHandler} href={loadedWorksheet.filePath}>View Worksheet</a>
        </div>}
      </div>
    </>
  )
}

export default Worksheet