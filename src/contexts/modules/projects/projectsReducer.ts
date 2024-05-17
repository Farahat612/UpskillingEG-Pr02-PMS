// Types
import { Project, Action } from '../../../types/interfaces'


interface State {
  projects: Project[]
  managerProjects: Project[]
  employeeProjects: Project[]
  selectedProject: object
  loading: boolean
  pageNumber: number
  pageSize: number
  title: string
  totalNumberOfRecords: number
  totalNumberOfPages: number
  managerPageNumber: number
  managerPageSize: number
  managerTitle: string
  managerTotalNumberOfRecords: number
  managerTotalNumberOfPages: number
  employeePageNumber: number
  employeePageSize: number
  employeeTitle: string
  employeeTotalNumberOfRecords: number
  employeeTotalNumberOfPages: number
}

// initial state
export const initialState: State = {
  projects: [],
  managerProjects: [],
  employeeProjects: [],
  selectedProject: {},
  loading: false,
  // Pagination and search filter for all projects in the systme
  pageNumber: 1,
  pageSize: 10,
  title: '', // search filter
  totalNumberOfRecords: 0,
  totalNumberOfPages: 0,
  // Pagination and search filter for manager projects
  managerPageNumber: 1,
  managerPageSize: 10,
  managerTitle: '', // search filter
  managerTotalNumberOfRecords: 0,
  managerTotalNumberOfPages: 0,
  // Pagination and search filter for employee projects
  employeePageNumber: 1,
  employeePageSize: 10,
  employeeTitle: '', // search filter
  employeeTotalNumberOfRecords: 0,
  employeeTotalNumberOfPages: 0,
}

// Reducer function
export const projectsReducer = (state: State, action: Action) => {
  switch (action.type) {
    // Loading
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    // CRUD operations
    case 'GET_ALL_PROJECTS_SUCCESS':
      return {
        ...state,
        projects: action.payload.data,
        loading: false,
        totalNumberOfRecords: action.payload.totalNumberOfRecords,
        totalNumberOfPages: action.payload.totalNumberOfPages,
      }

    case 'GET_MANAGER_PROJECTS_SUCCESS':
      return {
        ...state,
        managerProjects: action.payload.data,
        loading: false,
        managerTotalNumberOfRecords: action.payload.totalNumberOfRecords,
        managerTotalNumberOfPages: action.payload.totalNumberOfPages,
      }

    case 'GET_EMPLOYEE_PROJECTS_SUCCESS':
      return {
        ...state,
        employeeProjects: action.payload.data,
        loading: false,
        employeeTotalNumberOfRecords: action.payload.totalNumberOfRecords,
        employeeTotalNumberOfPages: action.payload.totalNumberOfPages,
      }

    case 'GET_PROJECT_BY_ID_SUCCESS':
      return {
        ...state,
        selectedProject: action.payload,
        loading: false,
      }

    case 'ADD_PROJECT_SUCCESS':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        managerProjects: [action.payload, ...state.managerProjects],
        loading: false,
      }

    case 'UPDATE_PROJECT_SUCCESS':
      return {
        ...state,
        projects: state.projects.map((project: Project) =>
          project.id === action.payload.id ? action.payload : project
        ),
        managerProjects: state.managerProjects.map((project: Project) =>
          project.id === action.payload.id ? action.payload : project
        ),
        loading: false,
      }

    case 'DELETE_PROJECT_SUCCESS':
      return {
        ...state,
        projects: state.projects.filter(
          (project: Project) => project.id !== action.payload
        ),
        managerProjects: state.managerProjects.filter(
          (project: Project) => project.id !== action.payload
        ),
        loading: false,
      }

    // Pagination and search filter
    // All projects
    case 'SET_ALL_PROJECTS_PAGINATION':
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      }
    case 'SET_ALL_PROJECTS_TITLE_FILTER':
      return {
        ...state,
        title: action.payload,
      }

    // Manager projects
    case 'SET_MANAGER_PROJECTS_PAGINATION':
      return {
        ...state,
        managerPageNumber: action.payload.pageNumber,
        managerPageSize: action.payload.pageSize,
      }
    case 'SET_MANAGER_PROJECTS_TITLE_FILTER':
      return {
        ...state,
        managerTitle: action.payload,
      }

    // Employee projects
    case 'SET_EMPLOYEE_PROJECTS_PAGINATION':
      return {
        ...state,
        employeePageNumber: action.payload.pageNumber,
        employeePageSize: action.payload.pageSize,
      }
    case 'SET_EMPLOYEE_PROJECTS_TITLE_FILTER':
      return {
        ...state,
        employeeTitle: action.payload,
      }

    default:
      return state
  }
}
