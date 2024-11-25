import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import SectionsHomePage from './sections/pages/SectionsHomePage';
import Authentication from './users/pages/Authentication';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<SectionsHomePage />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='*' />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
