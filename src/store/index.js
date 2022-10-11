import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import MemorySlice from "./memorySlice";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer, memory: MemorySlice.reducer },
});
export default store;
