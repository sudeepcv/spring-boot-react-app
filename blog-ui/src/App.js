import React from "react";
import UserInfoForm from "./page/UserInfoForm";
import LoginForm from "./page/LoginForm";
import LandingPage from "./page/LandingPage";
import AddBlog from "./page/AddBlog";
import Home from "./page/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/signup" element={<UserInfoForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/add-blog" element={<AddBlog />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
          </Routes>

          <ToastContainer />
        </Layout>
      </Router>
    </>
  );
}

export default App;
