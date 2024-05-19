import { SideBar, Navbar } from '../components/shared'
import { Outlet } from 'react-router-dom'

const MasterLayout = () => {
  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>
      <div className=' d-flex '>
        <div className=''>
          <SideBar />
        </div>
        <div className='content w-100 bg-light'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MasterLayout
