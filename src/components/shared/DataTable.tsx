import React from 'react'
import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'
import { useTasksContext } from '../../contexts/modules/tasks/tasksContext'
import { LuChevronsUpDown } from 'react-icons/lu'
import { LoadingScreen } from './'
import { Table } from 'react-bootstrap'

interface DataTableProps {
  tableColumns: string[]
  children: React.ReactNode
}

const DataTable = ({ tableColumns, children }: DataTableProps) => {
  const { state: projectsState } = useProjectsContext()
  const { state: taskState } = useTasksContext()

  return (
    <>
      {projectsState.loading || taskState.loading ? (
        <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
          <LoadingScreen />
        </div>
      ) : (
        <Table striped hover borderless responsive className=' thead-color  '>
          <thead className=' '>
            <tr className=' h-md '>
              <th className='align-middle thead-color text-light'>#</th>
              {tableColumns.map((column, index) => (
                <th key={index} className='align-middle thead-color text-light'>
                  {column}
                  <LuChevronsUpDown className='m-1' fontSize={20} />
                </th>
              ))}
              <th className='w-10 text-center align-middle thead-color text-light'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
      )}
    </>
  )
}

export default DataTable
