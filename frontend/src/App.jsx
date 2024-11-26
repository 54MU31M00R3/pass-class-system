import React, { useCallback, useState } from 'react';
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
import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();

  const login = useCallback((userId, userRole) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setRole(userRole)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setRole(null)
  })

  let router;

  if (isLoggedIn) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Authentication />} />
          <Route path='*' element={<HomePage />} />
        </Route>
      )
    )
  } else if (isLoggedIn && (role === 'student')) {
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/:userId/dashboard' element={<Dashboard />} />
          <Route path='/:sectionId/section' element={<SectionOverview />} />
          <Route path='*' />
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
          <Route path='*' />
        </Route>
      )
    )
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      role: userRole,
      login: login,
      logout: logout
    }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App;
