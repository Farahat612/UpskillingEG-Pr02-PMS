import { useAuthContext } from '../../contexts/global/AuthContext'

import { AdminTasks, EmployeeTasks } from '../../components/Tasks'

const Tasks = () => {
  const { userData } = useAuthContext()
  const isAdmin = userData.userGroup !== 'Employee'
  return (
    <>
      <div className='bg-body-tertiary h-100'>
        {isAdmin ? <AdminTasks /> : <EmployeeTasks />}
      </div>
    </>
  )
}

export default Tasks
