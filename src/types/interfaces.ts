// from getAllProjects endpoint
export interface Project {
  id: number
  title: string
  description: string
  creationDate: string
  modificationDate: string
  manager?: Manager
  task?: Task[]
}

export interface Task {
  id: number
  title: string
  description: string
  creationDate: string
  modificationDate: string
  status: 'ToDo' | 'InProgress' | 'Done'
  project?: Project
  employee?: Employee
}

export interface Manager {
  id: number
  userName: string
  imagePath?: string
  email: string
  password: string
  country: string
  phoneNumber: string
  verificationCode?: string
  isVerified: boolean
  isActivated: boolean
  creationDate: string
  modificationDate: string
}

export interface Employee {
  id: number
  userName: string
  imagePath?: string
  email: string
  password: string
  country: string
  phoneNumber: string
  verificationCode?: string
  isVerified: boolean
  isActivated: boolean
  creationDate: string
  modificationDate: string
}

export interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}
