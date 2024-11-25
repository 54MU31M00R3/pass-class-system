import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './users/shared/pages/HomePage';
import Authentication from './users/shared/pages/Authentication';
import Dashboard from './users/shared/pages/Dashboard';
import SectionPage from './users/shared/pages/SectionPage';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/:userId/dashboard' element={<Dashboard />} />
        <Route path='/:sectionId/section' element={<SectionPage />} />
        <Route path='*' />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
