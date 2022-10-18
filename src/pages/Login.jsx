import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import axios from "../api/axios";
import "../styles/utils.css";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "/users/login";
const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(["Empty field found"]);
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true
        }
      );

      // clear input fields
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      const user = response?.data?.newUsername;

      setUsername("");
      setPassword("");
      setError(null);
      setSuccess(true);
      const routeTo =  role === "admin" ? "/dashboard" : "/";
      const from =location.state?.from?.pathname || routeTo;

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
     
      setAuth({ user, role, accessToken });
    } catch (err) {
      const { errors } = err.response.data;
      setError(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
      <div className={error ? "show-error" : "hide-error"}>
        {error?.map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>

      <div className={success ? "show-success" : "hide-success"}>
        {success && <p> Login successfully. Redirecting... </p>}
      </div>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          className="input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          className="input"
          placeholder="Enter password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <Button className="btn-primary">Login</Button>
      </div>
      <div className="form-footer">
        Not a member? <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};

export default Login;
