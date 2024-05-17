import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Auth Provider
import AuthProvider from './contexts/global/AuthContext'
import ProjectsProvider from './contexts/modules/projects/projectsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </React.StrictMode>
)
