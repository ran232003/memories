import React from "react";
import { memoriesArray } from "../../dummyData";
import Memory from "./Memory";
import "./MemoryList.css";
const MemoryList = (props) => {
  return (
    <div className="memoryList">
      {memoriesArray.map((mem) => {
        return (
          <Memory
            key={mem.id}
            desc={mem.desc}
            title={mem.title}
            image={mem.image}
          />
        );
      })}
    </div>
  );
};

export default MemoryList;
