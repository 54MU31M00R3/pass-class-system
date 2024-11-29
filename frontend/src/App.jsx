import React, { useCallback, useState } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './shared/layouts/MainLayout';
import HomePage from './shared/pages/HomePage';
import Authentication from './auth/pages/Authentication';
import Dashboard from './shared/pages/Dashboard';
import SectionOverview from './sections/pages/SectionOverview';
import CreateSection from './sections/pages/CreateSection';
import UploadContent from './content/pages/UploadContent';
import { AuthContext } from './shared/context/auth-context';

// this function defines the react App which will return a specific
// router depending on user's state

function App() {
  // keeps track of whether or not the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // keeps track of user id
  const [userId, setUserId] = useState();
  // keeps track of users role which can vary from student, 
  // pass leader, and supervisor
  const [role, setRole] = useState();

  // this function will be used to log the user in and update their 
  //credentials to be used across the context of the website
  const login = useCallback((userId, userRole) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setRole(userRole)
  }, [])
  // this function will be used to log the user out and remove any 
  // existing credentials tied to the context of the site
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setRole(null)
  }, [])

  // the following defines the pages/route that will be available to the user
  // depending on their role and if they are logged in
  let router;

  if (isLoggedIn && (role === 'student')) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/:userId/dashboard' element={<Dashboard />} />
          <Route path='/:sectionId/section' element={<SectionOverview />} />
          <Route path='*' element={<HomePage />}/>
        </Route>
      )
    )
  } else if (isLoggedIn && (role === 'pass leader')) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/:userId/dashboard' element={<Dashboard />} />
          <Route path='/section/create' element={<CreateSection />} />
          <Route path='/:sectionId/section' element={<SectionOverview />} />
          <Route path='/:sectionId/section/content/upload' element={<UploadContent />} />
          <Route path='*' element={<HomePage />}/>
        </Route>
      )
    )
  } else if (!isLoggedIn) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Authentication />} />
          <Route path='*' element={<HomePage />} />
        </Route>
      )
    )
  }

  return (
    // allows the app to access the current users credentials 
    // and restrict them to their prescribed routes
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      role: role,
      login: login,
      logout: logout
    }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App;
