/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'
import { projectsReducer, initialState } from './projectsReducer'

// creating the context
const ProjectsContext = createContext({})

// creating the provider
const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState)

  return (
    <ProjectsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  )
}
export default ProjectsProvider

// custom hook to use the context
export const useProjectsContext = () => {
  const context = useContext(ProjectsContext) as {
    state: typeof initialState
    dispatch: React.Dispatch<any>
  }
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }

  return context
}
