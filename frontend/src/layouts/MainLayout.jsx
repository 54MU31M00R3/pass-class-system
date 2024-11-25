import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../users/shared/components/Navbar';

function MainLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default MainLayout