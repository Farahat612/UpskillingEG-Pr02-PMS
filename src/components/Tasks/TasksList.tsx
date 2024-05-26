import { Task } from '../../types/interfaces'
import { TaskCard } from './'

import { motion } from 'framer-motion'

type ListStatus = 'ToDo' | 'InProgress' | 'Done'

interface TaskListProps {
  listTitle: string
  listStatus: ListStatus
  tasks: Task[]
  hoveredOverList: ListStatus | null
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  setHoveredOverList: React.Dispatch<React.SetStateAction<ListStatus | null>>
  updateTaskStatus: (
    id: string | number,
    oldStatus: ListStatus,
    newStatus: ListStatus
  ) => void
}

const TasksList = ({
  listTitle,
  tasks,
  listStatus,
  setTasks,
  hoveredOverList,
  setHoveredOverList,
  updateTaskStatus,
}: TaskListProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('id')
    const task = tasks.find((task) => task.id === parseInt(id))
    if (task) {
      const oldStatus = task.status as ListStatus
      task.status = listStatus
      setTasks([...tasks])
      // update task status in backend && Refetch tasks --> Done
      updateTaskStatus(id, oldStatus, listStatus)
    }
    setHoveredOverList(null)
  }
  const handleDragEnter = (status: ListStatus) => {
    setHoveredOverList(status)
  }
  return (
    <>
      <div className='col-sm-12 col-md-3'>
        <h4 className='mb-4'>{listTitle}</h4>
        <motion.div
          layout={true}
          layoutId={listStatus}
          onDragEnter={() => handleDragEnter(listStatus)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
          className={`rounded-3 thead-color shadow-sm p-3 d-flex flex-column gap-3 
            ${hoveredOverList == listStatus && 'hoverdOverList'}
          `}
        >
          {tasks
            .filter((task) => task.status === listStatus)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </motion.div>
      </div>
    </>
  )
}

export default TasksList
