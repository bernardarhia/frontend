import React, { useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import axios from "../../api/axios";
import "../../styles/utils.css"
import {  useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const REGISTER_URL = "/users/register";
const Register = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

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
        REGISTER_URL,
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

      setTimeout(() => {
        navigate("/");
      }, 1500);
     
      setAuth({ user, role, accessToken });
    } catch (err) {
      const { errors } = err.response.data;
      setError(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Register</h1>
      <div className={error ? "show-error" : "hide-error"} >
        {error?.map((err, index)=> <p key={index}>{err}</p>)}
      </div>

      <div className={success ? "show-success" : "hide-success"}>
        {success && <p>Register successfully. Redirecting...</p>}
      </div>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <Button className="btn-primary">Signup</Button>
      </div>
      <div className="form-footer">
      Already a member?  <a href="/login">Login</a>
      </div>
    </form>
  );
};

export default Register;
