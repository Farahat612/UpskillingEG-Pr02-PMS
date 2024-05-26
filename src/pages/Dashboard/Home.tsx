/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/global/AuthContext'
import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'
import { useTasksContext } from '../../contexts/modules/tasks/tasksContext'
import { useDashboardContext } from '../../contexts/global/dashboardContext'

import useProjectsOperations from '../../contexts/modules/projects/projectsOperations'
import useTasksOperations from '../../contexts/modules/tasks/tasksOperations'
import usePieChartData from '../../hooks/usePieChartData'

import { Heading, StatsCard, PieChart } from '../../components/dashboard'
import {
  FaTasks,
  FaNetworkWired,
  FaUserCheck,
  FaUserAltSlash,
} from 'react-icons/fa'

const Home = () => {
  const { userData } = useAuthContext()
  const isAdmin = userData.userGroup !== 'Employee'
  const { state: projectsState } = useProjectsContext()
  const { state: tasksState } = useTasksContext()
  const { userStats, tasksStats } = useDashboardContext()

  const { getManagerProjects } = useProjectsOperations()
  const { getManagerTasks } = useTasksOperations()

  const { tasksPieChartData, usersPieChartData } = usePieChartData({
    TasksData: tasksStats,
    UsersData: userStats,
  })

  useEffect(() => {
    if (isAdmin) {
      getManagerProjects()
      getManagerTasks()
    }
  }, [])

  return (
    <div className='p-4 bg-body-tertiary'>
      <div className='banner d-flex flex-column justify-content-center align-items-start text-white fs-4 p-3'>
        <span className='z-3'>
          Hello <span className=' text-warning'>{userData.userName}</span>,
          welcome to your dashboard
        </span>
        {isAdmin && (
          <p className='z-3 mt-2'>
            You can add projects and assign tasks to your team.
          </p>
        )}
      </div>
      {isAdmin && (
        <div className='data d-flex justify-content-between py-3 gap-3'>
          <div className='stats tasks-stats py-3'>
            <Heading
              title='Tasks'
              description='Explore your team latest tasks stats.'
            />
            <div className='d-flex px-3 gap-3 justify-content-start align-items-center mt-3'>
              <StatsCard
                title='Tasks Number'
                value={tasksState.managerTotalNumberOfRecords}
                icon={<FaTasks size={20} />}
                color='#E4E4BC'
                bgColor='#F4F4E5'
              />
              <StatsCard
                title='Projects Number'
                value={projectsState.managerTotalNumberOfRecords}
                icon={<FaNetworkWired size={20} />}
                color='#E7C3D7'
                bgColor='#F4E5ED'
              />
            </div>
            <div className='charts mt-5 d-flex justify-content-center'>
              <PieChart data={tasksPieChartData} title='Tasks Stats' />
            </div>
          </div>
          <div className='stats users-stats py-3'>
            <Heading
              title='Users'
              description='Explore your team activity stats.'
            />
            <div className='d-flex px-3 gap-3 justify-content-start align-items-center mt-3'>
              <StatsCard
                title='Active Users'
                value={userStats.activatedEmployeeCount}
                icon={<FaUserCheck size={20} />}
                color='#CFD1EC'
                bgColor='#E5E6F4'
              />
              <StatsCard
                title='Inactive Users'
                value={userStats.deactivatedEmployeeCount}
                icon={<FaUserAltSlash size={20} />}
                color='#E4E4BC'
                bgColor='#F4F4E5'
              />
            </div>
            <div className='charts mt-5 d-flex justify-content-center'>
              <PieChart data={usersPieChartData} title='Users Stats' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
