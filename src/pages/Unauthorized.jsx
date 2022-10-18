import React from "react";
import {  Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Unauthorized = () => {
  const { auth } = useAuth();
//   Check user's current role store the route to redirect the user to
  const routeTo = auth=== null ? "/login" : auth?.role === "admin" ? "/dashboard" : "/";
  return (
    <>
      <div>You are not authorized to view this page.. go home</div>
      <Link to={routeTo}>Go home</Link>
    </>
  );
};

export default Unauthorized;
