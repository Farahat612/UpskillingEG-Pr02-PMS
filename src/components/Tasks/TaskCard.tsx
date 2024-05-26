import { useState } from 'react'
import { Task } from '../../types/interfaces'

import { motion } from 'framer-motion'

const TaskCard = ({ task }: { task: Task }) => {
  const [isDragging, setIsDragging] = useState(false)
  return (
    <motion.div layout={true} layoutId={task.id.toString()}>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('id', task.id.toString())
          setIsDragging(true)
        }}
        onDragEnd={() => setIsDragging(false)}
        className={`orange-bg d-flex justify-content-between w-100 mx-auto p-2 rounded-3 
          ${isDragging ? 'cursor-dragging' : 'cursor-draggable'}
        `}
      >
        <p className='text-white m-0'>{task.title}</p>
      </div>
    </motion.div>
  )
}

export default TaskCard
