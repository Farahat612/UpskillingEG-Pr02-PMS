/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProjectsContext } from './projectsContext'
import { apiProtected } from '../../../utils/api'
import { toast } from 'react-toastify'

const useProjectsOperations = () => {
  // Acessing Dispatch from the context
  const { dispatch } = useProjectsContext()

  // CRUD operations
  // 1.1 Get all projects in the system
  const getAllProjects = async (
    pageNumber?: number,
    pageSize?: number,
    title?: string
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Project', {
        params: { pageNumber, pageSize, title },
      })
      dispatch({ type: 'GET_ALL_PROJECTS_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching projects - ${error.response.data.message}`)
    }
  }
  // 1.2 Get all projects for manager
  const getManagerProjects = async (
    pageNumber?: number,
    pageSize?: number,
    title?: string
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Project/manager', {
        params: { pageNumber, pageSize, title },
      })
      dispatch({ type: 'GET_MANAGER_PROJECTS_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching projects - ${error.response.data.message}`)
    }
  }
  // 1.3 Get all projects for employee
  const getEmployeeProjects = async (
    pageNumber?: number,
    pageSize?: number,
    title?: string
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Project/employee', {
        params: { pageNumber, pageSize, title },
      })
      dispatch({
        type: 'GET_EMPLOYEE_PROJECTS_SUCCESS',
        payload: response.data,
      })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching projects - ${error.response.data.message}`)
    }
  }

  // 2. Get project by ID
  const getProjectById = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get(`/Project/${id}`)
      dispatch({ type: 'GET_PROJECT_BY_ID_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching project - ${error.response.data.message}`)
    }
  }

  // 3. Add project
  const addProject = async (newProjectFormData: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.post('/Project', newProjectFormData)
      dispatch({ type: 'ADD_PROJECT_SUCCESS', payload: response.data })
      toast.success('Project added successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error adding project - ${error.response.data.message}`)
    }
  }

  // 4. Update project
  const updateProject = async (updatedProject: any, id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.put(`/Project/${id}`, updatedProject)
      dispatch({ type: 'UPDATE_PROJECT_SUCCESS', payload: response.data })
      toast.success('Project updated successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error updating project - ${error.response.data.message}`)
    }
  }

  // 5. Delete project
  const deleteProject = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await apiProtected.delete(`/Project/${id}`)
      dispatch({ type: 'DELETE_PROJECT_SUCCESS', payload: id })
      toast.success('Project deleted successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error deleting project - ${error.response.data.message}`)
    }
  }

  // Setting Pagination and Filteration
  // 1 All projects
  const setAllProjectsPagination = (pageNumber: number, pageSize: number) => {
    dispatch({ type: 'SET_PAGINATION', payload: { pageNumber, pageSize } })
  }
  const setAllProjectsTitleFilter = (title: string) => {
    dispatch({ type: 'SET_TITLE_FILTER', payload: title })
  }

  // 2 Manager projects
  const setManagerProjectsPagination = (
    pageNumber: number,
    pageSize: number
  ) => {
    dispatch({
      type: 'SET_MANAGER_PROJECTS_PAGINATION',
      payload: { pageNumber, pageSize },
    })
  }
  const setManagerProjectsTitleFilter = (title: string) => {
    dispatch({ type: 'SET_MANAGER_PROJECTS_TITLE_FILTER', payload: title })
  }

  // 3 Employee projects
  const setEmployeeProjectsPagination = (
    pageNumber: number,
    pageSize: number
  ) => {
    dispatch({
      type: 'SET_EMPLOYEE_PROJECTS_PAGINATION',
      payload: { pageNumber, pageSize },
    })
  }
  const setEmployeeProjectsTitleFilter = (title: string) => {
    dispatch({ type: 'SET_EMPLOYEE_PROJECTS_TITLE_FILTER', payload: title })
  }

  return {
    getAllProjects,
    getManagerProjects,
    getEmployeeProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
    setAllProjectsPagination,
    setAllProjectsTitleFilter,
    setManagerProjectsPagination,
    setManagerProjectsTitleFilter,
    setEmployeeProjectsPagination,
    setEmployeeProjectsTitleFilter,
  }
}

export default useProjectsOperations
