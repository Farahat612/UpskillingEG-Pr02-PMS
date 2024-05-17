import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/nav-logo.png'
import { useAuthContext } from '../../contexts/global/AuthContext'

const Navbar = () => {
  const { userData } = useAuthContext()
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary text-end'>
      <div className='container-fluid'>
        <div>
          <img src={logo} alt='' />
        </div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <i className='fa-solid fa-chevron-down m-sm-1 ms-lg-2 d-flex border-start ps-3'>
              <img
                src={avatar}
                alt=''
                className='me-1 mt-1 '
                width={40}
                height={40}
              />
              <div>
                <p className=' text-start m-0'>Hello {userData.userName}</p>
                <p>{userData.userEmail}</p>
              </div>
            </i>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
