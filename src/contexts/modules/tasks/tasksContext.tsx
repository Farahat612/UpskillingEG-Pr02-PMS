/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'
import { tasksReducer, initialState } from './tasksReducer'

// creating the context
const TasksContext = createContext({})

// creating the provider
const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}
export default TasksProvider

// custom hook to use the context
export const useTasksContext = () => {
  const context = useContext(TasksContext) as {
    state: typeof initialState
    dispatch: React.Dispatch<any>
  }
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context
}
