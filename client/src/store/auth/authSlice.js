import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userId: null,
  isAuth: false,
  logout: false,
  error: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateSuccess(state, { payload }) {
      state.isAuth = true;
      state.username = payload.username;
      state.userId = payload.userId;
      state.error = {};
      state.logout = false;
    },
    authenticateFailed(state, { payload }) {
      state.isAuth = false;
      state.username = "";
      state.userId = null;
      state.error = payload.error;
      state.logout = false;
    },
    logoutSuccess(state) {
      state.username = "";
      state.userId = null;
      state.isAuth = false;
      state.error = {};
      state.logout = true;
    },
    logoutFailed(state, { payload: { error } }) {
      state.error = error;
    },
    clearError(state) {
      state.error = {};
    },
  },
});

const loginStarted = createAction("LOGIN_STARTED");
const registerStarted = createAction("REGISTER_STARTED");
const checkAuthStarted = createAction("CHECK_AUTH_STARTED");
const logoutStarted = createAction("LOGOUT_STARTED");

export const actions = {
  ...authSlice.actions,
  loginStarted,
  registerStarted,
  checkAuthStarted,
  logoutStarted,
};

export default authSlice.reducer;
