import React from 'react';

import worksheets from '../../assets/dummyData/worksheet.json'

function Worksheet({ content }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedWorksheet, setLoadedWorksheet] = useState();

  useEffect(() => {
    const fetchWorksheet = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/content/worksheet/${sectionId}`);

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
          <li>{content.datePosted}</li>
        </ul>
        <a className='worksheet' onClick={worksheetLinkHandler} href={worksheet.filePath}>View Worksheet</a>
      </div>}
    </>
  )
}

export default Worksheet