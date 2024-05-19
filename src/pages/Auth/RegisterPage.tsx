/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, InputGroup } from 'react-bootstrap'
import AuthLayout from '../../layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import { AuthForm, LoadingSpinner } from '../../components/shared'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { appendFormData } from '../../utils/formData'
import { apiPublic } from '../../utils/api'
import { notify } from '../../utils/notify'
import { Link, useNavigate } from 'react-router-dom'
import userImgPlaceholder from '../../assets/images/user.png'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [btnLoading, setBtnLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = async (data: Record<string, any>) => {
    const formData = appendFormData(data)
    try {
      setBtnLoading(true)
      const response = await apiPublic.post('/Users/Register', formData)
      notify({
        type: 'success',
        message: response.data.message,
      })
      navigate('/verify-password')
    } catch (error: any) {
      notify({
        type: 'error',
        message: error.response.data.message,
      })
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <AuthLayout bg='1'>
      <AuthForm>
        <h1 className='mb-4'>Create New Account</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* User Image */}
          <div className='mb-2 d-flex justify-content-center align-items-center'>
            <div className='rounded-circle d-flex justify-content-center align-items-center border-none bg-transparent position-relative'>
              <label
                htmlFor='profileImage'
                className='position-absolute w-100 h-100 opacity-0 top-0 start-0 '
              >
                <Form.Control
                  type='file'
                  id='profileImage'
                  className='rounded-circle w-100 h-100'
                  onChange={(e: any) => {
                    setPreviewImage(e.target.files[0])
                  }}
                />
              </label>
              <img
                src={
                  previewImage
                    ? URL.createObjectURL(previewImage)
                    : userImgPlaceholder
                }
                alt='user'
                className='img-fluid rounded-circle'
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          </div>

          {/* usename and email */}
          <div className='row mb-3'>
            {/* username */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>Username</span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type='text'
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Enter your username'
                  aria-label='Username'
                  {...register('userName', {
                    required: 'username is required',
                    maxLength: {
                      value: 8,
                      message: 'Username should not exceed 8 characters',
                    },
                  })}
                />
              </InputGroup>
              {errors.userName && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.userName.message as string}
                </div>
              )}
            </div>
            {/* email */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>Email</span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type='text'
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Enter your E-mail'
                  aria-label='Email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </InputGroup>
              {errors.email && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.email.message as string}
                </div>
              )}
            </div>
          </div>

          {/* country and Phone Number */}
          <div className='row my-3'>
            {/* country */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>Country</span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type='text'
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Enter your country'
                  aria-label='Country'
                  {...register('country', {
                    required: 'Country is required',
                  })}
                />
              </InputGroup>
              {errors.country && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.country.message as string}
                </div>
              )}
            </div>
            {/* phone number */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>
                Phone Number
              </span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type='text'
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Enter your phone number'
                  aria-label='Phone Number'
                  {...register('phoneNumber', {
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: 'Invalid Phone Number',
                    },
                  })}
                />
              </InputGroup>
              {errors.phoneNumber && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.phoneNumber.message as string}
                </div>
              )}
            </div>
          </div>

          {/* Password and confirm Password */}
          <div className='row my-3'>
            {/* password */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>Password</span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Enter your password'
                  aria-label='Password'
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                />
                <InputGroup.Text
                  className='bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
              {errors.password && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.password.message as string}
                </div>
              )}
            </div>
            {/* confirm password */}
            <div className='col-md-6'>
              <span className='field-name d-inline-block mt-3'>
                Confirm Password
              </span>
              <InputGroup className=' mb-2'>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  className='w-100 px-0 pb-2 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
                  placeholder='Confirm your password'
                  aria-label='Confirm Password'
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === watch('password') ||
                      'The passwords do not match',
                  })}
                />
                <InputGroup.Text
                  className='bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
              {errors.confirmPassword && (
                <div className='alert alert-danger py-1 border-0'>
                  {errors.confirmPassword.message as string}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='d-block btn submit-btn w-75 mt-5 mx-auto rounded-5 py-2 text-white '
          >
            {btnLoading ? (
              <LoadingSpinner loadingTxt='Registering' />
            ) : (
              'Register'
            )}
          </button>

          {/* Already have an account? */}
          <div className='d-flex justify-content-center gap-2 my-3 '>
            <span>Already have an account?</span>
            <Link to='/login' className='text-reset text-decoration-none'>
              <span className='text-main'>Login</span>
            </Link>
          </div>
        </Form>
      </AuthForm>
    </AuthLayout>
  )
}

export default RegisterPage
