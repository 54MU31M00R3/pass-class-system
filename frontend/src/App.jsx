import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './shared/pages/HomePage';
import Authentication from './auth/pages/Authentication';
import Dashboard from './shared/pages/Dashboard';
import SectionOverview from './content/pages/SectionOverview';
import CreateSection from './content/pages/CreateSection';
import UploadContent from './content/pages/UploadContent';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/:userId/dashboard' element={<Dashboard />} />
        <Route path='/section/create' element={<CreateSection />} />
        <Route path='/:sectionId/section' element={<SectionOverview />} />
        <Route path='/:sectionId/section/content/upload' element={<UploadContent />} />
        <Route path='*' />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
