import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/nav-logo.png'

const Navbar = () => {
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
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page'>
                <img src={avatar} alt='' className='me-1' />
                Hello Name
                <i className='fa-solid fa-chevron-down m-sm-1 ms-lg-2'></i>
                <i className='fa-regular fa-bell ms-lg-2 m-sm-1'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
