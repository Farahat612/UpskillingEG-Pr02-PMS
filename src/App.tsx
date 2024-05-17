// react-router-dom
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
// react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { useAuthContext } from './contexts/global/AuthContext'

// Pages
import {
  ForgotPassPage,
  LoginPage,
  RegisterPage,
  ResetPassPage,
  VerifyPassPage,
} from './pages/Auth'
import { Home, Projects, Tasks, Users } from './pages/Dashboard'
// RouteGuard and Layouts
import { RouteGuard } from './components/shared'
import { AuthLayoutWrapper, MasterLayout } from './layouts'
import Notfound from './pages/Notfound/Notfound'

function App() {
  // auth context
  const { loggedIn, saveLoginData } = useAuthContext()
  useEffect(() => {
    // console.log('App mounted', loggedIn)

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
          errorElement={<Notfound />}
        >
          <Route index element={<Home />} />

          <Route path='Home' element={<Home />} />
          <Route path='Users' element={<Users />} />
          <Route path='Projects' element={<Projects />} />
          <Route path='Tasks' element={<Tasks />} />
        </Route>

        {/* ------------ Auth Layout ------------ */}
        <Route
          path='/'
          element={
            <RouteGuard redirectPath='/dashboard' isAllowed={!loggedIn}>
              <AuthLayoutWrapper />
            </RouteGuard>
          }
          errorElement={<Notfound />}
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
