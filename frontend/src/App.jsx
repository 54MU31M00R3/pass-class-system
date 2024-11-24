import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import Navbar from './shared/components/Navbar';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
      </Route>
    )
  )

  return <RouterProvider router={router}/>
}

export default App
