import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../store/auth";
import { Navigate } from "react-router-dom";
function LandingPage() {
  if (isLoggedIn()) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 mt-5 pt-5">Welcome to the Blog</h1>
        <p>
          Register yourself to access our blog and discover exciting articles.
        </p>

        <div>
          <Link to="/signup" className="btn btn-primary btn-lg" role="button">
            Sign up
          </Link>{" "}
          <Link
            to="/login"
            className="btn btn-secondary btn-lg ml-3"
            role="button"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
