import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={
        <div>
          Hello world!
        </div>
      }>
      </Route>
    )
  )

  return <RouterProvider router={router}/>
}

export default App
