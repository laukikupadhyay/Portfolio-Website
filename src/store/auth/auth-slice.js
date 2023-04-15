// store/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: null || {}, // get user from local storage
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
