/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'
import useProjectsOperations from '../../contexts/modules/projects/projectsOperations'
import { useDebouncedCallback } from 'use-debounce'

import { useAuthContext } from '../../contexts/global/AuthContext'


import {
  CustomPagination,
  DataTable,
  LoadingScreen,
} from '../../components/shared'
// icons
import { FaEye, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// Model Delete
import { Modal, Button } from 'react-bootstrap'
import deleteAvatar from '../../assets/images/no-data.png'

function Projects() {
  const { userData } = useAuthContext()
  const isAdmin = userData.userGroup !== 'Employee'

  const [showDelete, setShowDelete] = useState(false)
  const [projectsMangerId, setProjectsMangerId] = useState(0)
  const {
    getManagerProjects,
    setManagerProjectsPagination,
    setManagerProjectsTitleFilter,
    deleteProject,
  } = useProjectsOperations()
  const { state: projectsState } = useProjectsContext()

  // Debounce Filter
  const debounceProjectTitleFilter = useDebouncedCallback(
    (value) => setManagerProjectsTitleFilter(value),
    500
  )


  useEffect(() => {
    if (isAdmin) {
      getManagerProjects(
        projectsState.managerPageNumber,
        projectsState.managerPageSize,
        projectsState.managerTitle
      )
    }
  }, [
    projectsState.managerPageNumber,
    projectsState.managerPageSize,
    projectsState.managerTitle,
  ])
  // Model Delete
  const handleDeleteClose = () => setShowDelete(false)
  const handleDeleteShow = (id: number) => {
    setProjectsMangerId(id)
    setShowDelete(true)
  }

  const columns = ['Title', 'Description', 'DreationDate']
  return (
    <>
      <div className='d-flex justify-content-between align-items-center bg-white shadow-sm p-3 '>
        <h2>Projects</h2>
        <Link
          className='btn submit-btn px-3 rounded-5 text-white'
          to={'/dashboard/addProject'}
        >
          + Add New Project
        </Link>
      </div>
      <div className=' bg-white col-11 mx-auto shadow-lg mt-5 p-4 rounded-3'>
        <div className=' position-relative'>
          <FaSearch className=' position-absolute mt-3 ms-2' />
          <input
            type='text'
            className=' rounded-4 p-2 ps-5 form-check-input w-25 h-100 mb-5'
            placeholder='Search By Title'
            onChange={(e) => debounceProjectTitleFilter(e.target.value)}
          />
        </div>
        <DataTable tableColumns={columns}>
          {projectsState.managerProjects.map((project, index) => (
            <>
              {projectsState.loading ? (
                <LoadingScreen />
              ) : (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                  <td>
                    <div
                      role='button'
                      className=' d-flex justify-content-center align-items-center gap-2 '
                    >
                      <Link to={`/dashboard/editProject/${project.id}`}>
                        <FaEdit className='text-warning cursor-pointer' />
                      </Link>
                      <FaTrashAlt
                        className='text-danger cursor-pointer'
                        size={14}
                        onClick={() => handleDeleteShow(project.id)}
                      />
                      <Link to={`/dashboard/project/${project.id}`}>
                        <FaEye className='text-success cursor-pointer' />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </DataTable>
        {projectsState.totalNumberOfRecords > 10 && (
          <CustomPagination
            pageNumber={projectsState.pageNumber}
            pageSize={projectsState.pageSize}
            totalNumberOfRecords={projectsState.totalNumberOfRecords}
            setPagination={setManagerProjectsPagination}
          />
        )}
      </div>
      {/*  Model Delete */}
      <Modal
        centered
        show={showDelete}
        onHide={handleDeleteClose}
      >
        <Modal.Header closeButton>
          <h3 className='modalTitle'>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center deleteData'>
            <img
              src={deleteAvatar}
              className='img-fluid mb-3'
              alt='delete Avatar'
            />
            <h6 className='mb-2'>
              Are you sure you want to delete this item ?
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            onClick={() => {
              deleteProject(projectsMangerId), handleDeleteClose()
            }}
            className='delete'
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Projects
