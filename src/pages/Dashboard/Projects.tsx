/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useProjectsContext } from "../../contexts/modules/projects/projectsContext";
import useProjectsOperations from "../../contexts/modules/projects/projectsOperations";
import {
  CustomPagination,
  DataTable,
  LoadingScreen,
} from "../../components/shared";
// icons
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function Projects() {
  const {
    getManagerProjects,
    setManagerProjectsPagination,
    setManagerProjectsTitleFilter,
  } = useProjectsOperations();
  const { state: projectsState } = useProjectsContext();
  useEffect(() => {
    getManagerProjects(
      projectsState.managerPageNumber,
      projectsState.managerPageSize,
      projectsState.managerTitle
    );
  }, [
    projectsState.managerPageNumber,
    projectsState.managerPageSize,
    projectsState.managerTitle,
  ]);

  const columns = ["Title", "Description", "DreationDate"];
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center p-4 bg-white pb-5">
        <h1>Projects</h1>
        <button className="btn  submit-btn w-25 h-25 rounded-4 text-white">
          + Add New Project
        </button>
      </div>
      <div className=" bg-white col-10  col-md-8 col-lg-11 me-auto ms-auto shadow-lg mt-5 p-4 rounded-3">
        <div className=" position-relative">
          <CiSearch className=" position-absolute mt-3 ms-2" />
          <input
            type="text"
            className=" rounded-4 p-2 ps-5 form-check-input w-25 h-100 mb-5"
            placeholder="Search By Title"
            onChange={(e) => setManagerProjectsTitleFilter(e.target.value)}
          />
        </div>
        <DataTable tableColumns={columns}>
          {projectsState.managerProjects.map((project, index) => (
            <>
              {projectsState.loading ? (
                <LoadingScreen />
              ) : (
                <tr>
                  <th>{++index}</th>
                  <th>{project.title}</th>
                  <th>{project.description}</th>
                  <th>{new Date(project.creationDate).toLocaleDateString()}</th>
                  <th className="">
                    <CiEdit
                      fontSize={30}
                      className="text-warning cursor-pointer"
                    />
                    <MdDeleteOutline
                      fontSize={30}
                      className="text-danger cursor-pointer"
                    />
                  </th>
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
          ""
        )}
      </div>
    </>
  );
}

export default Projects;
