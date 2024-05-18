/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, React } from "react";
import useTasksOperations from "../../contexts/modules/tasks/tasksOperations";
import { useTasksContext } from "../../contexts/modules/tasks/tasksContext";
import { NoData } from "../../components/shared";
import { DataTable, CustomPagination } from "../../components/shared";

// icons
import { IoFilterOutline } from "react-icons/io5";
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function Tasks() {
  const {
    setManagerTasksPagination,
    setManagerTasksTitleFilter,
    getManagerTasks,
  } = useTasksOperations();

  const { state: taskState } = useTasksContext();

  useEffect(() => {
    getManagerTasks(
      taskState.managerPageNumber,
      taskState.managerPageSize,
      taskState.managerTitle,
      taskState.managerStatus
    );
  }, [
    taskState.managerPageNumber,
    taskState.managerPageSize,
    taskState.managerTitle,
    taskState.managerStatus,
  ]);

  const columns = ["Title", "Status", "User", "Project", "Date"];

  return (
    <>
      <div className="header d-flex justify-content-between align-items-center p-4 bg-white pb-5">
        <h1>Tasks</h1>
        <button className="btn submit-btn rounded-5 text-white">
          + Add New Task
        </button>
      </div>
      <div className="bg-white col-10 col-md-8 col-lg-11 me-auto ms-auto shadow-lg mt-5 p-4 rounded-3">
        <div className="d-flex align-items-center mb-5 gap-3">
          <input
            type="text"
            className="rounded-5 p-2 ps-5 form-check-input w-25 h-100"
            placeholder="Search By Title"
            onChange={(e) => setManagerTasksTitleFilter(e.target.value)}
          />
          <div className="border p-2 rounded-5 d-flex align-items-center gap-2">
            <IoFilterOutline fontSize={25} />
            Filter
          </div>
        </div>
        <DataTable tableColumns={columns}>
          {taskState.managerTasks.map((task, index) => (
            <>
              {taskState.managerTasks.length > 0 ? (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.employee?.userName}</td>
                  <td>{task.project?.title}</td>
                  <td>{new Date(task.creationDate).toLocaleDateString()}</td>
                  <td>
                    <CiEdit
                      fontSize={30}
                      className="text-warning cursor-pointer"
                    />
                    <MdDeleteOutline
                      fontSize={30}
                      className="text-danger cursor-pointer"
                    />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={8}>
                    <NoData />
                  </td>
                </tr>
              )}
            </>
          ))}
        </DataTable>
        {taskState.managerTotalNumberOfRecords > 10 ? (
          <CustomPagination
            pageNumber={taskState.managerPageNumber}
            pageSize={taskState.managerPageSize}
            totalNumberOfRecords={taskState.managerTotalNumberOfRecords}
            setPagination={setManagerTasksPagination}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Tasks;
