/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { apiProtected } from '../../utils/api'
import { useAuthContext } from './AuthContext'

export type ListsForFormsContextType = {
  allProjects: any[]
  allUsers: any[]
}

export const ListsForFormsContext = createContext({})

const ListsForFormsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allProjects, setAllProjects] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const { userData } = useAuthContext()
  const isAdmin = userData.userGroup === 'Manager'

  // Function for fetching all the lists that are needed for forms
  const fetchAllProjects = async () => {
    try {
      const response = await apiProtected.get('/Project/manager', {
        params: {
          pageNumber: 1,
          pageSize: 100,
          title: '',
        },
      })
      setAllProjects(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchAllUsers = async () => {
    try {
      const response = await apiProtected.get('/Users/Manager', {
        params: {
          pageNumber: 1,
          pageSize: 100,
          name: '',
        },
      })
      setAllUsers(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchAllProjects()
      fetchAllUsers()
    }
  }, [])

  return (
    <ListsForFormsContext.Provider
      value={{
        allProjects,
        allUsers,
      }}
    >
      {children}
    </ListsForFormsContext.Provider>
  )
}

export default ListsForFormsProvider

export const useListsForForms = () => {
  return useContext(ListsForFormsContext) as ListsForFormsContextType
}
