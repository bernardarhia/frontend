import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Button from "../common/Button";
import Input from "../common/Input";
import axios from "../api/axios";
import "../styles/utils.css"
const LOGIN_URL = "/users/login";
const Login = () => {
  const {setAuth} = useContext(AuthContext);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Empty field found");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        { username, password },
        // {
        //   withCredentials:true
        // }
      );
      
      // clear input fields
      // const accessToken = response?.data?.token
      console.log(response);
      setUsername("")
      setPassword("")
      setError(null)
      setSuccess(true)
    } catch (err) {
// const {errors} = err.response.data;
// setError(errors)
console.dir(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
      <div className={error ? "show-error" : "hide-error"} >
        {error?.map((err, index)=> <p key={index}>{err}</p>)}
      </div>

      <div className={success ? "show-success" : "hide-success"}>
        {success && <p>Login successfully. Redirecting...</p>}
      </div>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          className="input"
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
          className="input"
          placeholder="Enter password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <Button className="btn-primary">Login</Button>
      </div>
      <div className="form-footer">
      Not a member?  <a href="/register">Sign up</a>
      </div>
    </form>
  );
};

export default Login;
