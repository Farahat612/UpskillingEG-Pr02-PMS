import { Task, Action } from '../../../types/interfaces'

// State interface
interface State {
  managerTasks: Task[]
  employeeTasks: Task[]
  tasksInProject: Task[]
  selectedTask: object
  allTasksStats: object
  loading: boolean
  // Pagination and search filter for Manager tasks
  managerPageNumber: number
  managerPageSize: number
  managerTitle: string
  managerStatus: string
  managerTotalNumberOfRecords: number
  managerTotalNumberOfPages: number
  // Pagination and search filter for Employee tasks
  employeePageNumber: number
  employeePageSize: number
  employeeTitle: string
  employeeStatus: string
  employeeTotalNumberOfRecords: number
  employeeTotalNumberOfPages: number
  // Pagination and search filter for Tasks in project
  tasksInProjectPageNumber: number
  tasksInProjectPageSize: number
  tasksInProjectTitle: string
  tasksInProjectStatus: string
  tasksInProjectTotalNumberOfRecords: number
  tasksInProjectTotalNumberOfPages: number
}

// initial state
export const initialState: State = {
  managerTasks: [],
  employeeTasks: [],
  tasksInProject: [],
  selectedTask: {},
  allTasksStats: {},
  loading: false,
  // Pagination and search filter for Manager tasks
  managerPageNumber: 1,
  managerPageSize: 10,
  managerTitle: '', // title search filter
  managerStatus: '', // status search filter
  managerTotalNumberOfRecords: 0,
  managerTotalNumberOfPages: 0,
  // Pagination and search filter for Employee tasks
  employeePageNumber: 1,
  employeePageSize: 10,
  employeeTitle: '', // title search filter
  employeeStatus: '', // status search filter
  employeeTotalNumberOfRecords: 0,
  employeeTotalNumberOfPages: 0,
  // Pagination and search filter for Tasks in project
  tasksInProjectPageNumber: 1,
  tasksInProjectPageSize: 10,
  tasksInProjectTitle: '', // title search filter
  tasksInProjectStatus: '', // status search filter
  tasksInProjectTotalNumberOfRecords: 0,
  tasksInProjectTotalNumberOfPages: 0,
}

// Reducer function
export const tasksReducer = (state: State, action: Action) => {
  switch (action.type) {
    // Loading
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    // Manager tasks
    case 'GET_MANAGER_TASKS_SUCCESS':
      return {
        ...state,
        managerTasks: action.payload.data,
        loading: false,
        managerTotalNumberOfRecords: action.payload.totalNumberOfRecords,
        managerTotalNumberOfPages: action.payload.totalNumberOfPages,
      }

    // Employee tasks
    case 'GET_EMPLOYEE_TASKS_SUCCESS':
      return {
        ...state,
        employeeTasks: action.payload.data,
        loading: false,
        employeeTotalNumberOfRecords: action.payload.totalNumberOfRecords,
        employeeTotalNumberOfPages: action.payload.totalNumberOfPages,
      }

    // Tasks in project
    case 'GET_TASKS_IN_PROJECT_SUCCESS':
      return {
        ...state,
        tasksInProject: action.payload.data,
        loading: false,
        tasksInProjectTotalNumberOfRecords: action.payload.totalNumberOfRecords,
        tasksInProjectTotalNumberOfPages: action.payload.totalNumberOfPages,
      }

    // Task by ID
    case 'GET_TASK_BY_ID_SUCCESS':
      return {
        ...state,
        selectedTask: action.payload,
        loading: false,
      }

    // Add task
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        managerTasks: [action.payload, ...state.managerTasks],
        loading: false,
      }

    // Update task
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        managerTasks: state.managerTasks.map((task: Task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
      }

    // Delete task
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        managerTasks: state.managerTasks.filter(
          (task: Task) => task.id !== action.payload
        ),
        loading: false,
      }

    // All tasks stats
    case 'GET_ALL_TASKS_STATS_SUCCESS':
      return {
        ...state,
        allTasksStats: action.payload,
        loading: false,
      }

    // TODO : Change Task Status

    // Pagination and search filter for Manager tasks
    case 'SET_MANAGER_TASKS_PAGINATION':
      return {
        ...state,
        managerPageNumber: action.payload.pageNumber,
        managerPageSize: action.payload.pageSize,
      }
    case 'SET_MANAGER_TASKS_TITLE_FILTER':
      return {
        ...state,
        managerTitle: action.payload,
      }
    case 'SET_MANAGER_TASKS_STATUS_FILTER':
      return {
        ...state,
        managerStatus: action.payload,
      }

    // Pagination and search filter for Employee tasks
    case 'SET_EMPLOYEE_TASKS_PAGINATION':
      return {
        ...state,
        employeePageNumber: action.payload.pageNumber,
        employeePageSize: action.payload.pageSize,
      }
    case 'SET_EMPLOYEE_TASKS_TITLE_FILTER':
      return {
        ...state,
        employeeTitle: action.payload,
      }
    case 'SET_EMPLOYEE_TASKS_STATUS_FILTER':
      return {
        ...state,
        employeeStatus: action.payload,
      }

    // Pagination and search filter for Tasks in project
    case 'SET_TASKS_IN_PROJECT_PAGINATION':
      return {
        ...state,
        tasksInProjectPageNumber: action.payload.pageNumber,
        tasksInProjectPageSize: action.payload.pageSize,
      }
    case 'SET_TASKS_IN_PROJECT_TITLE_FILTER':
      return {
        ...state,
        tasksInProjectTitle: action.payload,
      }
    case 'SET_TASKS_IN_PROJECT_STATUS_FILTER':
      return {
        ...state,
        tasksInProjectStatus: action.payload,
      }

    default:
      return state
  }
}
