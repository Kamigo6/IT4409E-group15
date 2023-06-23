import React, { lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = ({ isAuthenticated, handleLogin }) => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.post("http://localhost:8000/auth/register", values);
      handleLogin();
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
          <Link to="/">
            <img
              src="https://images.unsplash.com/photo-1558901357-ca41e027e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=639&q=80"
              alt="..."
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign Up</h4>
          <SingUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
