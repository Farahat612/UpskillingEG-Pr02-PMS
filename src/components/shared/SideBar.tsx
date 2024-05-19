import { Modal } from 'react-bootstrap'
import { FaKey, FaSignOutAlt, FaTasks, FaUsers } from 'react-icons/fa'
import { GrProjects } from 'react-icons/gr'
import { IoClose, IoHomeSharp } from 'react-icons/io5'
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import { useAuthContext } from '../../contexts/global/AuthContext'
import ChangePass from './ChangePass'
import './styles/Sidebar.css'

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toogleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const { logOut } = useAuthContext()

  // change password modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <div className='sidebar-container position-relative'>
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem onClick={toogleCollapsed} className='toggler-icon'>
              {isCollapsed ? (
                <MdKeyboardArrowRight className='arrow' />
              ) : (
                <MdOutlineKeyboardArrowLeft className='arrow' />
              )}
            </MenuItem>
            <MenuItem
              icon={<IoHomeSharp />}
              component={<Link to='/dashboard' />}
              className='mt-5'
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<FaUsers />}
              component={<Link to='/dashboard/users' />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<GrProjects />}
              component={<Link to='/dashboard/projects' />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<FaTasks />}
              component={<Link to='/dashboard/tasks' />}
            >
              Tasks
            </MenuItem>

            <MenuItem icon={<FaKey />} onClick={handleShow}>
              Change Password
            </MenuItem>

            <MenuItem icon={<FaSignOutAlt />} onClick={logOut}>
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        <Modal size='lg' show={show} onHide={handleClose} centered>
          <IoClose
            className='close-icon'
            size={30}
            onClick={() => {
              handleClose()
            }}
          />
          <div className='d-flex flex-column align-items-center change-pass-modal'>
            <ChangePass handleClose={handleClose} />
          </div>
        </Modal>
      </div>
    </>
  )
}
export default SideBar
