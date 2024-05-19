import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { apiPublic } from "../../utils/api";
import { notify } from "../../utils/notify";

import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoadingSpinner, AuthForm } from "../../components/shared";
import AuthLayout from "../../layouts/AuthLayout";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

// type of data from form
interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { saveLoginData } = useContext(AuthContext) as AuthContextType;
  const [btnLoading, setBtnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    try {
      setBtnLoading(true);
      const response = await apiPublic.post(`/Users/Login`, data);
      localStorage.setItem("token", response.data.token);
      notify({
        type: "success",
        message: "Logged in successfully",
      });
      saveLoginData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify({
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <AuthLayout bg="3">
      <AuthForm>
        <h1>Login</h1>
        <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <InputGroup className="mb-2">
            <span className="field-name">Email</span>
            <Form.Control
              type="text"
              className="w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent"
              placeholder="Enter your E-mail"
              aria-label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%=-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid E-mail !",
                },
              })}
            />
          </InputGroup>
          {errors.email && (
            <div className="alert alert-danger py-1 border-0">
              {errors.email.message}
            </div>
          )}

          {/* Password */}
          <span className="field-name d-inline-block mt-3">Password</span>
          <InputGroup className="mb-2 position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              aria-label="Password"
              className="w-100 px-0 pb-3 border-0 border-bottom border-bottom-primary rounded-0 bg-transparent"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <InputGroup.Text
              className="bg-transparent text-white border-0 position-absolute top-50 end-0 translate-middle-y cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: 10 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          {errors.password && (
            <div className="alert alert-danger py-1 border-0">
              {errors.password.message}
            </div>
          )}

          {/* Regiter Now? & Forgot Password? */}
          <div className="d-flex justify-content-between my-3 ">
            <Link to="/register" className="text-reset text-decoration-none">
              Register Now?
            </Link>
            <Link
              to="/forgot-password"
              className="text-reset text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="d-block btn submit-btn w-75 mt-5 mx-auto rounded-5 py-2 text-white "
          >
            {btnLoading ? <LoadingSpinner loadingTxt="Logging in" /> : "Login"}
          </button>
        </Form>
      </AuthForm>
    </AuthLayout>
  );
};

export default LoginPage;
