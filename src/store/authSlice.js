import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
  name: "cart",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default AuthSlice;

export const authAction = AuthSlice.actions;
