import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";

import { actions } from "../store/auth/authSlice";
import { authUserSelector } from "../store/auth/authSelectors";

const {
  loginStarted,
  checkAuthStarted,
  registerStarted,
  logoutStarted,
  clearError,
} = actions;

const useAuth = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);
  const alert = useAlert();

  const errorMsg = authUser?.error?.response?.data?.message;
  useEffect(() => {
    errorMsg && alert.show(errorMsg);
    dispatch(clearError());
  }, [errorMsg]);

  return {
    authUser,
    login(credentials) {
      dispatch(loginStarted(credentials));
    },
    register(user) {
      dispatch(registerStarted(user));
    },
    checkAuth() {
      dispatch(checkAuthStarted());
    },
    logout() {
      dispatch(logoutStarted());
    },
  };
};

export default useAuth;
