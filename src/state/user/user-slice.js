import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentUserInfo: null || {},
  currentUserToken: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserInfo = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
