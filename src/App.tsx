// react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useContext, useEffect } from 'react'
import { AuthContext, AuthContextType } from './contexts/AuthContext'

// Pages
import {
  LoginPage,
  RegisterPage,
  ForgotPassPage,
  VerifyPassPage,
  ResetPassPage,
} from './pages/Auth'
import { Home } from './pages/Dashboard'
// RouteGuard and Layouts
import { RouteGuard } from './components/shared'
import { MasterLayout, AuthLayoutWrapper } from './layouts'
import Notfound from './pages/Notfound/Notfound'

function App() {
  // auth context
  const { loggedIn, saveLoginData } = useContext(AuthContext) as AuthContextType
  useEffect(() => {
    console.log('App mounted', loggedIn);
    
    saveLoginData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  // router
  const router = createBrowserRouter(
    createRoutesFromElements([
      <>
        {/* ------------ Master Layout ------------ */}
        <Route
          path='/dashboard'
          element={
            <RouteGuard redirectPath='/login' isAllowed={loggedIn}>
              <MasterLayout />
            </RouteGuard>
        
          }
          errorElement={<Notfound/>}
        >

          <Route index element={<Home />} />
        </Route>

        {/* ------------ Auth Layout ------------ */}
        <Route
          path='/'
          element={
            <RouteGuard redirectPath='/dashboard' isAllowed={!loggedIn}>
              <AuthLayoutWrapper />
            </RouteGuard>
          }
          errorElement={<Notfound/>}
        >
          <Route index element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPassPage />} />
          <Route path='verify-password' element={<VerifyPassPage />} />
          <Route path='reset-password' element={<ResetPassPage />} />
        
        </Route>

      </>,
    ])
  )

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
