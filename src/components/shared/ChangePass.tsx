import { Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AuthForm, LoadingSpinner } from '.'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { apiProtected } from '../../utils/api'
import { notify } from '../../utils/notify'

interface FormData {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePass = ({ handleClose }: { handleClose: () => void }) => {
  const [btnLoading, setBtnLoading] = useState(false)
  const [showOldPassword, setShowoldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = async (data: FormData) => {
    try {
      setBtnLoading(true)
      const response = await apiProtected.put('/Users/ChangePassword', data)
      console.log(response)
      notify({
        type: 'success',
        message: 'Your password has been changed successfully!',
      })
      handleClose()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <AuthForm>
      <h1>Change Password</h1>
      <Form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        {/* old password  */}
        <span className='field-name d-inline-block'>Old Password</span>
        <InputGroup className='mb-2 position-relative'>
          <Form.Control
            type={showOldPassword ? 'text' : 'password'}
            placeholder='Enter Your old Password'
            aria-label='oldPassword'
            className='w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
            {...register('oldPassword', {
              required: 'oldPassword is required',
            })}
          />
          <InputGroup.Text
            className='bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer'
            onClick={() => setShowoldPassword(!showOldPassword)}
            style={{ zIndex: 10 }}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.oldPassword && (
          <div className='alert alert-danger py-1 border-0'>
            {errors.oldPassword.message}
          </div>
        )}
        {/* New Password */}
        <span className='field-name d-inline-block mt-3'>New Password</span>
        <InputGroup className='mb-2 position-relative'>
          <Form.Control
            type={showNewPassword ? 'text' : 'password'}
            placeholder='Enter Your New Password'
            aria-label='Password'
            className='w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
            {...register('newPassword', {
              required: 'newPassword is required',
            })}
          />
          <InputGroup.Text
            className='bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer'
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{ zIndex: 10 }}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.newPassword && (
          <div className='alert alert-danger py-1 border-0'>
            {errors.newPassword.message}
          </div>
        )}
        {/* confirm New Password */}
        <span className='field-name d-inline-block mt-3'>
          Confirm New Password
        </span>
        <InputGroup className='mb-2 position-relative'>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Enter Your New Password Again'
            aria-label='Password'
            className='w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
            {...register('confirmNewPassword', {
              required: 'confirmNewPassword is required',
              validate: (value: string) => {
                if (watch('newPassword') != value) {
                  return "The Password don't match"
                }
              },
            })}
          />
          <InputGroup.Text
            className='bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ zIndex: 10 }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        {errors.confirmNewPassword && (
          <div className='alert alert-danger py-1 border-0'>
            {errors.confirmNewPassword.message}
          </div>
        )}
        <button
          type='submit'
          className='d-block btn submit-btn w-75 mt-5 mx-auto rounded-5 py-2 text-white'
        >
          {btnLoading ? <LoadingSpinner loadingTxt='Changing Your Password' /> : 'Change'}
        </button>
      </Form>
    </AuthForm>
  )
}
export default ChangePass
