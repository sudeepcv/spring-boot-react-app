import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useBoundStore } from "../store/boundStore";
import { useNavigate ,Navigate} from "react-router-dom";
import { isLoggedIn } from "../store/auth";
function UserInfoForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { addUser, isLoadingSignup } = useBoundStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addUser(data);
      reset();
      navigate("/login");
    } catch (error) {}
  };

  if (isLoggedIn()) {
    return <Navigate to="/home" replace />; 
  }

  return (
    <>
      <h2 className="mt-5 pt-5">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  {...field}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
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
          disabled={isLoadingSignup}
        >
          {isLoadingSignup ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Signing up...</span>
            </>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </>
  );
}

export default UserInfoForm;
