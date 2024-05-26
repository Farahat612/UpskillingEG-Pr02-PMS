// react-router-dom
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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
import {
  Home,
  Projects,
  ProjectDetails,
  Tasks,
  Users,
  AddTask,
  EditTask,
  AddProject,
  EditProject,
} from './pages/Dashboard'
// RouteGuard and Layouts
import { RouteGuard } from './components/shared'
import { AuthLayoutWrapper, MasterLayout } from './layouts'
import Notfound from './pages/Notfound/Notfound'

import { LoadingScreen } from './components/shared'

function App() {
  // auth context
  const { loggedIn, saveLoginData, loading } = useAuthContext()
  useEffect(() => {
    // console.log('App mounted', loggedIn)

    saveLoginData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  // router
  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: (
        <RouteGuard redirectPath='/login' isAllowed={loggedIn}>
          <MasterLayout />
        </RouteGuard>
      ),
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'projects',
          element: <Projects />,
        },
        {
          path: 'tasks',
          element: <Tasks />,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'addTask',
          element: <AddTask />,
        },
        {
          path: 'editTask/:id',
          element: <EditTask />,
        },
        {
          path: 'addProject',
          element: <AddProject />,
        },
        {
          path: 'editProject/:id',
          element: <EditProject />,
        },
        {
          path: 'project/:id',
          element: <ProjectDetails />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <RouteGuard redirectPath='/dashboard' isAllowed={!loggedIn}>
          <AuthLayoutWrapper />
        </RouteGuard>
      ),
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPassPage />,
        },
        {
          path: 'verify-password',
          element: <VerifyPassPage />,
        },
        {
          path: 'reset-password',
          element: <ResetPassPage />,
        },
      ],
    },
  ])

  if (loading) {
    return (
      <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
        <LoadingScreen />
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
