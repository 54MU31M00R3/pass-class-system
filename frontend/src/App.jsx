import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Sections from './sections/pages/Sections';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Sections />} />
        <Route path='*' />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
