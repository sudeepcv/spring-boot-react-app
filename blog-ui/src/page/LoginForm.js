import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useBoundStore } from "../store/boundStore"; 
import { useNavigate,Navigate } from "react-router-dom";
import { isLoggedIn } from "../store/auth";
function LoginForm() {  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { loginUser, isLoadingLogin } = useBoundStore(); 
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
  
      if (response && response.success) {
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  if (isLoggedIn()) {
    return <Navigate to="/home" replace />; 
  }


  return (
    <>
      <h2 className="mt-5 pt-5">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  id="username"
                  {...field}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </>
            )}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  {...field}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </>
            )}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-5"
          disabled={isLoadingLogin}
        >
          {isLoadingLogin ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
