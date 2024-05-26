/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { apiProtected } from '../../utils/api'
import { toast } from 'react-toastify'

import TasksList from './TasksList'
import { Task } from '../../types/interfaces'

type ListStatus = 'ToDo' | 'InProgress' | 'Done'

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [hoveredOverList, setHoveredOverList] = useState<ListStatus | null>(
    null
  )
  const [fetchCount, refetch] = useState(0)

  const updateTaskStatus = async (
    id: string | number,
    oldStatus: ListStatus,
    newStatus: ListStatus
  ) => {
    try {
      if (oldStatus === newStatus) {
        return
      } else {
        await apiProtected.put(`/Task/${id}/change-status`, {
          status: newStatus,
        })
        toast.success(
          `Task ${id} status updated from ${oldStatus} to ${newStatus}`
        )
        refetch(fetchCount + 1)
      }
    } catch (error) {
      toast.error('Failed to update task status')
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiProtected.get('/Task')
        setTasks(response.data.data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }

    fetchTasks()
  }, [fetchCount])

  return (
    <>
      <div className='bg-white shadow-sm p-3 '>
        <h2>Task Board</h2>
      </div>
      <div className='continer mt-3 overflow-hidden'>
        <div className='row gap-sm-2 gap-md-3 justify-content-around'>
          <TasksList
            listTitle={'To Do'}
            listStatus='ToDo'
            tasks={tasks}
            setTasks={setTasks}
            hoveredOverList={hoveredOverList}
            setHoveredOverList={setHoveredOverList}
            updateTaskStatus={updateTaskStatus}
          />
          <TasksList
            listTitle={'In Progress'}
            listStatus='InProgress'
            tasks={tasks}
            setTasks={setTasks}
            hoveredOverList={hoveredOverList}
            setHoveredOverList={setHoveredOverList}
            updateTaskStatus={updateTaskStatus}
          />
          <TasksList
            listTitle={'Done'}
            listStatus='Done'
            tasks={tasks}
            setTasks={setTasks}
            hoveredOverList={hoveredOverList}
            setHoveredOverList={setHoveredOverList}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </div>
    </>
  )
}

export default EmployeeTasks
