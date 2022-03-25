import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const { authUser, checkAuth } = useAuth();
  !authUser.isAuth && !authUser.logout && checkAuth();

  return authUser.isAuth === true ? (
    children
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default RequireAuth;
