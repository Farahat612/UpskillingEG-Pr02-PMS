import { Link } from 'react-router-dom'
import Logo from '../../assets/images/PMS 3.svg'

const AuthForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Logo */}
      <div className='text-center mb-4'>
        <Link to={"/login"}>
        <img src={Logo} alt='logo' className='img-fluid logo' />
        </Link>
      </div>
      {/* Form */}
      <div className='row auth-form p-sm-5 rounded rounded-5'>
        <span>Welcome to PMS</span>
        {children}
      </div>
    </>
  )
}

export default AuthForm
