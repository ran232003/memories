import { createSlice, current } from "@reduxjs/toolkit";
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
    deletePost(state, action) {
      const { memoryId, userId } = action.payload;
      let newMemories = state.memories.filter((mem, index) => {
        // console.log(mem.userId != userId, mem.userId, userId);
        // console.log(mem.id != memoryId, mem._id, memoryId, index);
        // return mem.userId != userId && mem._id != memoryId;
        if (mem.userId == userId) {
          if (mem._id != memoryId) {
            return mem;
          }
        }
      });
      state.memories = newMemories;
    },
    like(state, action) {
      const { memoryId, userId } = action.payload;
      const memoryFind = state.memories.find((mem, index) => {
        if (mem._id == memoryId) {
          mem["index"] = index;
          return mem;
        }
      });
      console.log("memObject", memoryFind);
      let memObject = current(memoryFind);
      console.log(memObject);
      let user = memObject.likes.find((like) => {
        return like == userId;
      });

      if (user) {
        //remove like

        state.memories[memObject.index].likes = state.memories[
          memObject.index
        ].likes.filter((user) => {
          return user != userId;
        });
      } else {
        state.memories[memoryFind.index].likes.push(userId);
      }
    },
  },
});

export default MemorySlice;

export const memoryAction = MemorySlice.actions;
