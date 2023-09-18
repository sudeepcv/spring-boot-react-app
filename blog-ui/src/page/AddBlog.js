import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {useBoundStore} from "../store/boundStore";

function AddBlog() {
  const { isLoadingAddBlog, errorAddBlog, addBlog } = useBoundStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addBlog(data.title, data.body);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the blog");
    }
  };

  return (
    <div className="mt-5 pt-5">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      {errorAddBlog && (
          <div className="alert alert-danger mb-3">{errorAddBlog}</div>
        )}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...field}
              />
            )}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <Controller
            name="body"
            control={control}
            rules={{ required: "Body is required" }}
            render={({ field }) => (
              <textarea
                className={`form-control ${errors.body ? "is-invalid" : ""}`}
                rows="4"
                {...field}
              />
            )}
          />
          {errors.body && (
            <div className="invalid-feedback">{errors.body.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoadingAddBlog}
        >
          {isLoadingAddBlog ? "Adding..." : "Add Blog"}
        </button>
     
      </form>
    </div>
  );
}

export default AddBlog;
