/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTasksContext } from './tasksContext'
import { apiProtected } from '../../../utils/api'
import { toast } from 'react-toastify'

const useTasksOperations = () => {
  // Acessing Dispatch from the context
  const { dispatch } = useTasksContext()

  // CRUD operations
  // 1.1 Get all tasks for manager
  const getManagerTasks = async (
    pageNumber?: number,
    pageSize?: number,
    title?: string,
    status?: string
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Task/manager', {
        params: { pageNumber, pageSize, title, status },
      })
      dispatch({ type: 'GET_MANAGER_TASKS_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching tasks - ${error.response.data.message}`)
    }
  }
  // 1.2 Get all tasks for employee
  const getEmployeeTasks = async (
    pageNumber?: number,
    pageSize?: number,
    title?: string,
    status?: string
  ) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Task', {
        params: { pageNumber, pageSize, title, status },
      })
      dispatch({
        type: 'GET_EMPLOYEE_TASKS_SUCCESS',
        payload: response.data,
      })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching tasks - ${error.response.data.message}`)
    }
  }

  // 2. Get Task by ID
  const getTaskById = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get(`/Task/${id}`)
      dispatch({ type: 'GET_TASK_BY_ID_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching task - ${error.response.data.message}`)
    }
  }

  // 3. Create a new task
  const createTask = async (newTask: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.post('/Task', newTask)
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data })
      toast.success('Task created successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error creating task - ${error.response.data.message}`)
    }
  }
  // 4. Update a task
  const updateTask = async (updatedTask: any, id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.put(`/Task/${id}`, updatedTask)
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data })
      toast.success('Task updated successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error updating task - ${error.response.data.message}`)
    }
  }
  // 5. Delete a task
  const deleteTask = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await apiProtected.delete(`/Task/${id}`)
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id })
      toast.success('Task deleted successfully')
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error deleting task - ${error.response.data.message}`)
    }
  }
  // 6. Get all tasks stats
  const getAllTasksStats = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiProtected.get('/Task/count')
      dispatch({ type: 'GET_ALL_TASKS_STATS_SUCCESS', payload: response.data })
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error(`Error fetching tasks stats - ${error.response.data.message}`)
    }
  }

  // TODO: Change Task Status

  // Setting Pagination and Filteration
  // 1. Pagination and search filters for Manager tasks
  const setManagerTasksPagination = (pageNumber: number, pageSize: number) => {
    dispatch({
      type: 'SET_MANAGER_TASKS_PAGINATION',
      payload: { pageNumber, pageSize },
    })
  }
  const setManagerTasksTitleFilter = (title: string) => {
    dispatch({ type: 'SET_MANAGER_TASKS_TITLE_FILTER', payload: title })
  }
  const setManagerTasksStatusFilter = (status: string) => {
    dispatch({ type: 'SET_MANAGER_TASKS_STATUS_FILTER', payload: status })
  }

  // 2. Pagination and search filters for Employee tasks
  const setEmployeeTasksPagination = (pageNumber: number, pageSize: number) => {
    dispatch({
      type: 'SET_EMPLOYEE_TASKS_PAGINATION',
      payload: { pageNumber, pageSize },
    })
  }
  const setEmployeeTasksTitleFilter = (title: string) => {
    dispatch({ type: 'SET_EMPLOYEE_TASKS_TITLE_FILTER', payload: title })
  }
  const setEmployeeTasksStatusFilter = (status: string) => {
    dispatch({ type: 'SET_EMPLOYEE_TASKS_STATUS_FILTER', payload: status })
  }

  // 3. Pagination and search filters for tasks in a project
  const setProjectTasksPagination = (pageNumber: number, pageSize: number) => {
    dispatch({
      type: 'SET_TASKS_IN_PROJECT_PAGINATION',
      payload: { pageNumber, pageSize },
    })
  }
  const setProjectTasksTitleFilter = (title: string) => {
    dispatch({ type: 'SET_TASKS_IN_PROJECT_TITLE_FILTER', payload: title })
  }
  const setProjectTasksStatusFilter = (status: string) => {
    dispatch({ type: 'SET_TASKS_IN_PROJECT_STATUS_FILTER', payload: status })
  }

  return {
    getManagerTasks,
    getEmployeeTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getAllTasksStats,
    setManagerTasksPagination,
    setManagerTasksTitleFilter,
    setManagerTasksStatusFilter,
    setEmployeeTasksPagination,
    setEmployeeTasksTitleFilter,
    setEmployeeTasksStatusFilter,
    setProjectTasksPagination,
    setProjectTasksTitleFilter,
    setProjectTasksStatusFilter,
  }
}

export default useTasksOperations
