import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../components/Navbar';

// this component is meant to provides the navbar component
// to every page and allows content to be displayed through 
// its outlet component

function MainLayout() {
  return (
    <>
        <Navbar/>
        {/* Outlet allows other components to be rendered through mainlayout */}
        <Outlet/>
        {/* Component for external package to display success and error notis */}
        <ToastContainer/>
    </>
  )
}

export default MainLayout