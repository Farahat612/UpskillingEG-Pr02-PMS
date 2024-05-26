/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { UserStats, TasksStats } from '../../types/interfaces'
import { apiProtected } from '../../utils/api'
import { useAuthContext } from './AuthContext'

type DashboardContextType = {
  tasksStats: TasksStats
  userStats: UserStats
}

export const DashboardContext = createContext({})

export const useDashboardContext = () => {
  return useContext(DashboardContext) as DashboardContextType
}

// provider
const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuthContext()
  const isAdmin = userData.userGroup === 'Manager'
  // states
  const [userStats, setUserStats] = useState<UserStats>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  })
  const [tasksStats, setTasksStats] = useState<TasksStats>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  })

  // fetch users stats
  const fetchUserStats = async () => {
    try {
      const response = await apiProtected.get('/Users/count')
      setUserStats(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // fetch tasks stats
  const fetchTasksStats = async () => {
    try {
      const response = await apiProtected.get('/Task/count')
      setTasksStats(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUserStats()
      fetchTasksStats()
    }
  }, [])

  return (
    <DashboardContext.Provider value={{ tasksStats, userStats }}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
