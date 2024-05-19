import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { FaUsers, FaTasks, FaSignOutAlt, FaKey } from 'react-icons/fa'
import { GrProjects } from 'react-icons/gr'
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { Modal } from 'react-bootstrap'

import { useState, useContext } from 'react'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import ChangePass from './ChangePass'
import './styles/Sidebar.css'

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toogleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const { logOut } = useContext(AuthContext) as AuthContextType

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
