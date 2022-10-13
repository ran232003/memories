import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { memoryAction } from "../store/memorySlice";
import MemoryList from "./components/MemoryList";
import { memoriesArray } from "../dummyData";
import { getMemories } from "../api/apiCalls";
const HomePage = (props) => {
  const dispatch = useDispatch();
  const fetchMemories = async () => {
    const data = await getMemories();
    dispatch(memoryAction.setMemories(data.memories));
  };
  fetchMemories();
  // dispatch(memoryAction.setMemories(memoriesArray));
  return (
    <div>
      <Helmet>
        {/* <style>{"body { background-color: #add8e6; }"}</style> */}
      </Helmet>
      <MemoryList memories={memoriesArray} />
    </div>
  );
};

export default HomePage;
