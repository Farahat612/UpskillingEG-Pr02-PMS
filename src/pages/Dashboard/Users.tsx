

import { useEffect, useMemo } from 'react'

import {  useDebouncedCallback } from 'use-debounce'


import {
  CustomPagination,
  DataTable,
  LoadingScreen,
} from '../../components/shared'
import { useUsersContext } from '../../contexts/modules/users/usersContext'
import useUsersOperations from '../../contexts/modules/users/usersOperations'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
function Users() {
  const {
    getAllUsers,
    toggleUserActiveStatus,
    setUserNameFilter,
    setEmailFilter,
    setCountryFilter,
    setGroupsFilter,
    setPagination,
  } = useUsersOperations()
  const { state } = useUsersContext()
  // Debounce Filter
  const debouncedSetUserNameFilter = useDebouncedCallback(
    (value) => setUserNameFilter(value),
    500
  )
  const debouncedSetEmailFilter = useDebouncedCallback(
    (value) => setEmailFilter(value),
    500
  )

  const debouncedSetCountryFilter = useDebouncedCallback(
    (value) => setCountryFilter(value),
    500
  )

  useEffect(() => {
    getAllUsers(
      state.pageNumber,
      state.pageSize,
      state.userNameFilter,
      state.emailFilter,
      state.countryFilter,
      state.groupsFilter
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pageNumber,
    state.pageSize,
    state.userNameFilter,
    state.emailFilter,
    state.countryFilter,
    state.groupsFilter,
  ])

  const columns = ['User Name', 'Status', 'Phone Number', 'Email', 'Date']
  return (
    <>
      <div className='d-flex  align-items-center bg-white shadow-sm p-3 '>
        <h2>Users</h2>
      </div>
      {/* Filteration Users */}
      <div className='bg-white col-11 mx-auto shadow-lg mt-5 p-4 rounded-3'>
        <div className='d-flex align-items-center justify-content-between my-3 gap-3 flex-wrap'>
          <input
            type='text'
            className='form-control rounded-5 w-40'
            placeholder='Search By UserName'
            onChange={(e) => debouncedSetUserNameFilter(e.target.value)}
          />
          <input
            type='text'
            className='form-control rounded-5 w-40'
            placeholder='Search By Email'
            onChange={(e) => debouncedSetEmailFilter(e.target.value)}
          />
          <input
            type='text'
            className='form-control rounded-5 w-40'
            placeholder='Search By Country'
            onChange={(e) => debouncedSetCountryFilter(e.target.value)}
          />
          <select
            className='form-select rounded-5 w-40'
            value={state.groupsFilter}
            onChange={(e) => setGroupsFilter(e.target.value)}
          >
            <option value=''>User Groups</option>
            <option value='1'>Manager</option>
            <option value='2'>Empoyee</option>
          </select>
        </div>
        {/* Table of Data */}
        <DataTable tableColumns={columns}>
          {state.loading ? (
            <LoadingScreen />
          ) : (
            state.users.map((user, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{user.userName}</td>
                <td>
                  <div
                    className={` text-center rounded-4 text-white me-5 py-1${
                      user.isActivated ? ' bg-success' : ' bg-danger'
                    }`}
                  >
                    {user.isActivated ? 'Active' : 'Not Active'}{' '}
                  </div>
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{new Date(user.creationDate).toLocaleDateString()}</td>
                {/* We Need To reset statu Of User After Toggle Him only This User */}
                <td
                  className='text-center cursor-pointer'
                  onClick={() => toggleUserActiveStatus(user.id)}
                >
                  {user.isActivated ? (
                    <FaToggleOn
                      size={35}
                      className=' text-success'
                    />
                  ) : (
                    <FaToggleOff
                      size={35}
                      className=' text-danger'
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </DataTable>
        {/* Pagination */}
        {!state.loading && state.totalNumberOfRecords >= 10 && (
          <CustomPagination
            pageNumber={state.pageNumber}
            pageSize={state.pageSize}
            setPagination={setPagination}
            totalNumberOfRecords={state.totalNumberOfRecords}
          />
        )}
      </div>
      {/* Users Table */}
    </>
  )
}

export default Users
