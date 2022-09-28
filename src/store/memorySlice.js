import { createSlice } from "@reduxjs/toolkit";
const MemorySlice = createSlice({
  name: "cart",
  initialState: { memories: [] },
  reducers: {
    setMemories(state, action) {
      state.memories = action.payload;
    },
    addPost(state, action) {
      state.memories.push(action.payload);
    },
  },
});

export default MemorySlice;

export const memoryAction = MemorySlice.actions;
