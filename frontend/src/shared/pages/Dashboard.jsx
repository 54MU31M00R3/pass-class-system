import React from 'react';
import { useParams } from 'react-router-dom';

import SectionsList from '../../sections/components/SectionsList';
import sections from '../../assets/dummyData/sections.json';


function Dashboard() {
  const userId = useParams().userId;

  const userSections = sections.filter(section => {
    return (section.studentIds.find(Id => Id == userId) || section.mentorId == userId)
  });

  return <SectionsList loadedSections={userSections} />
}

export default Dashboard