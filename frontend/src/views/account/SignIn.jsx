import React, { lazy, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = ({ isAuthenticated, handleLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      handleLogin();
      navigate("/"); // Navigate to the home page
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred during login");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-6 p-3 d-none d-md-block">
          <Link to="/">
            <img
              src="https://images.unsplash.com/photo-1558901357-ca41e027e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=639&q=80"
              alt="..."
              className="img-fluid"
              style={{ border: "10px solid white" }}
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign In</h4>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignInView;
