import React from 'react';
import { useParams } from 'react-router-dom';

import SectionsList from '../components/SectionsList';
import sections from '../../../assets/dummyData/sections.json';


function Dashboard() {
  const userId = useParams().userId;

  const userSections = sections.filter(section => {
    return section.userIds.find(Id => Id == userId)
  });

  return <SectionsList loadedSections={userSections} />
}

export default Dashboard