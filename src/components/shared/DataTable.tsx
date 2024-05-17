import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'

import { LoadingScreen } from './'
import { Table } from 'react-bootstrap'

interface DataTableProps {
  tableColumns: string[]
  children: React.ReactNode
}

const DataTable = ({ tableColumns, children }: DataTableProps) => {
  const { state: projectsState } = useProjectsContext()

  return (
    <>
      {projectsState.loading ? (
        <div className='w-100 h-100 my-5 py-5 d-flex flex-column justify-content-center align-items-center gap-3'>
          <LoadingScreen />
        </div>
      ) : (
        <Table
          striped
          hover
          borderless
          responsive
          className='rounded rounded-5'
        >
          <thead className='rounded rounded-5'>
            <tr className='table-secondary h-md rounded rounded-5'>
              <th className='w-10 align-middle'>#</th>
              {tableColumns.map((column, index) => (
                <th key={index} className='align-middle'>
                  {column}
                </th>
              ))}
              <th className='w-10 text-center align-middle'>Actions</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
      )}
    </>
  )
}

export default DataTable
