import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

// this component is meant to provides the navbar component
// to every page and allows content to be displayed through 
// its outlet component

function MainLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default MainLayout