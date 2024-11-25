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
import SectionPage from './content/pages/SectionPage';
import CreateSection from './content/pages/CreateSection';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/:userId/dashboard' element={<Dashboard />} />
        <Route path='/:sectionId/section' element={<SectionPage />} />
        <Route path='/section/create' element={<CreateSection />} />
        <Route path='*' />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
