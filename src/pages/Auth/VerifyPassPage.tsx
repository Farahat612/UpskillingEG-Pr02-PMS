import AuthLayout from '../../layouts/AuthLayout'
import { Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingSpinner, AuthForm } from "../../components/shared";
import { apiPublic } from '../../utils/api'
import { notify } from '../../utils/notify'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string
  code: number
}

const VerifyPassPage = () => {

  const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setBtnLoading(true)
      const response = await apiPublic.put(`/Users/verify`, data)
      console.log(response)
      notify({
        type: 'success',
        message: response.data.message,
      })
      navigate('/login')
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
    <AuthLayout bg='1'>
      <AuthForm>
      <h1>Verify Account</h1>
      <Form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <InputGroup className='mt-4 mb-2'>
          <span className='field-name'>Email</span>
          <Form.Control
            type='text'
            className='w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent'
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
            {errors.email.message}
          </div>
        )}

        <span className="field-name d-inline-block mt-3">Otp Verfication</span>
        <InputGroup className="mb-2 position-relative">
          <Form.Control
            placeholder="Enter Verification"
            aria-label="OTP"
            className="w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent"
            {...register("code", {
              required: "OTP is required",
            })}
          />
        </InputGroup>
        {errors.code && (
          <div className="alert alert-danger py-1 border-0">
            {errors.code.message}
          </div>
        )}


        {/* Submit */}
        <button
          type='submit'
          className='d-block btn submit-btn w-75 mt-5 mx-auto rounded-5 py-2 text-white '
        >
          {btnLoading ? <LoadingSpinner loadingTxt='Verifying' /> : 'Verify'}
        </button>
      </Form>
      </AuthForm>
    </AuthLayout>
  )
}

export default VerifyPassPage
