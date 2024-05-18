/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useProjectsContext } from '../../contexts/modules/projects/projectsContext'
import useProjectsOperations from '../../contexts/modules/projects/projectsOperations'
import {
  CustomPagination,
  DataTable,
  LoadingScreen,
} from '../../components/shared'
// icons
import { CiEdit, CiSearch } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteAvatar from '../../assets/images/no-data.png'
import { useNavigate } from 'react-router-dom'




function Projects() {
  const [showDelete, setShowDelete] = useState(false);
  const[projectsMangerId, setProjectsMangerId] = useState(0);
  
  const {
    getManagerProjects,
    setManagerProjectsPagination,
    setManagerProjectsTitleFilter,
    deleteProject
  } = useProjectsOperations()
  const { state: projectsState } = useProjectsContext()
  useEffect(() => {
    getManagerProjects(
      projectsState.managerPageNumber,
      projectsState.managerPageSize,
      projectsState.managerTitle
    )
  }, [
    projectsState.managerPageNumber,
    projectsState.managerPageSize,
    projectsState.managerTitle,
  ])

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id: number) =>{
    setProjectsMangerId(id);
    setShowDelete(true);
    }



  const columns = ['Title', 'Description', 'DreationDate']
  return (
    <div className='projects-container'>
      <div className='header p-sm-4 p-3 bg-white pb-5 '>
        <div className="row">
          <div className="col-md-6">
          <h1>Projects</h1>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
          <button className='btn submit-btn'>
          + Add New Project
        </button>
          </div>
        </div>
      </div>
      <div className='bg-white col-11 col-md-8 col-lg-11 me-auto ms-auto shadow-lg mt-5 rounded-3'>
        <div className=' position-relative p-4'>
          <CiSearch className=' search-icon position-absolute ms-2' />
          <input
            type='text'
            className=' rounded-4 p-2 ps-5 form-check-input w-25 h-100 mb-5'
            placeholder='Search By Title'
            onChange={(e) => setManagerProjectsTitleFilter(e.target.value)}
          />
        </div>
        <DataTable tableColumns={columns}>
          {projectsState.managerProjects.map((project, index) => (
            <>
              {projectsState.loading ? (
                <LoadingScreen />
              ) : (
                <tr key={project.id}>
                  <td>{++index}</td>
                  <td>{project.title}</td>
                  <td className=' text-break'>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                  <td className=''>
                    <CiEdit
                      fontSize={20}
                      className='text-warning cursor-pointer ms-1 mb-2 mb-sm-0'
                    />
                    <MdDeleteOutline
                      fontSize={20}
                      className='text-danger cursor-pointer ms-1'
                      onClick={()=> handleDeleteShow(project.id)}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </DataTable>
        {projectsState.totalNumberOfRecords > 10 ? (
          <CustomPagination
            pageNumber={projectsState.pageNumber}
            pageSize={projectsState.pageSize}
            totalNumberOfRecords={projectsState.totalNumberOfRecords}
            setPagination={setManagerProjectsPagination}
          />
        ) : (
          ''
        )}
      </div>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3 className='modalTitle'>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
        <div className='text-center deleteData'>
            <img src={deleteAvatar} className='img-fluid mb-3' alt="delete Avatar" />
            <h5 className='mb-2'>Delete This Project ?</h5>
            <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=> {deleteProject(projectsMangerId), handleDeleteClose()}} className='delete'>Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Projects
