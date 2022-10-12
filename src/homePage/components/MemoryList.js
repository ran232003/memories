import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoriesArray } from "../../dummyData";
import { memoryAction } from "../../store/memorySlice";
import Memory from "./Memory";
import "./MemoryList.css";
const MemoryList = (props) => {
  //const { memories } = props;
  const memories = useSelector((state) => {
    return state.memory.memories;
  });
  console.log(memories);
  return (
    <div className="memoryList">
      {memories.map((mem) => {
        return (
          <Memory
            key={mem._id}
            id={mem._id}
            desc={mem.desc}
            title={mem.title}
            image={mem.image}
            likes={mem.likes.length}
            userId={mem.userId}
            likesArray={mem.likes}
          />
        );
      })}
    </div>
  );
};

export default MemoryList;
