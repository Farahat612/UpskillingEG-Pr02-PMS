/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { Card, Table } from 'react-bootstrap'
import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'
import useProjectsOperations from '../../contexts/modules/projects/projectsOperations'
import { useEffect } from 'react'

function ProjectDetails() {
  const params = useParams()
  const projectId = params.id as string
  const { getProjectById } = useProjectsOperations()
  const { state: projectsState } = useProjectsContext()

  useEffect(() => {
    getProjectById(projectId)
    console.log(projectsState.selectedProject)
  }, [projectId])

  return (
    <>
      <div className='bg-white'>
        <Link to={'/dashboard/projects'}>
          <button className='btn  submit-btn px-4 ms-4 rounded-4 text-white'>
            Back To Projects
          </button>
        </Link>
      </div>
      <div className='header d-flex justify-content-between align-items-center p-4 bg-white pb-5'>
        <h1>Project # {projectId} Details</h1>
        <div>
          <button className='btn bg-success text-white px-4 me-4'>
            <CiEdit
              className='me-2'
              size={20}
            />
            Edit
          </button>
          <button className='btn bg-danger text-white px-4'>
            <MdDeleteOutline
              className='me-2'
              size={20}
            />
            Delete
          </button>
        </div>
      </div>
      <div className='bg-white col-10  col-md-8 col-lg-11 me-auto ms-auto shadow-lg mt-5 p-4 rounded-3'>
        <Table
          striped
          hover
          borderless
          responsive
        >
          <tbody>
            <>
              <tr>
                <td className='w-0'>Title</td>
                <td>{projectsState.selectedProject?.title}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{projectsState.selectedProject.description}</td>
              </tr>
              <tr>
                <td>CreationDate</td>
                <td>
                  {new Date(
                    projectsState.selectedProject.creationDate
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td>Managername</td>
                <td>{projectsState.selectedProject.manager?.userName}</td>
              </tr>
              <tr>
                <td>ManagerEmail</td>
                <td>{projectsState.selectedProject.manager?.email}</td>
              </tr>
            </>
          </tbody>
        </Table>
        
        {projectsState.selectedProject.task &&  projectsState.selectedProject.task.length > 1 ? (
          <>
            
            <h1 className='mt-3'>Tasks</h1>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                {projectsState.selectedProject.task[0].title}
                </Card.Subtitle>
                <Card.Text>
                {projectsState.selectedProject.task[0].status}
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default ProjectDetails
