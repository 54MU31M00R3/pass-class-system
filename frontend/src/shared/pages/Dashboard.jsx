import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SectionsList from '../../sections/components/SectionsList';

// this component will return pass 
// sections that the user is affiliated with

function Dashboard() {
  // retrieve userId from the url
  const userId = useParams().userId;
  // tracks content loading status
  const [isLoading, setIsLoading] = useState(false);
  // used to set the content once it has been fetched from the backend
  const [loadedSections, setLoadedSections] = useState();

  // get request to backend for all sections based on userId
  useEffect(() => {
    const fetchSections = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/sections/user/${userId}`);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setLoadedSections(responseData.sections)
      setIsLoading(false);
    }
    fetchSections();
  }, [])

  return (
    <>
      {/* once the data has been fetched and if there is any data at all this component will be loaded */}
      
      {!isLoading && loadedSections && <SectionsList loadedSections={loadedSections} />}
    </>
  )
}

export default Dashboard