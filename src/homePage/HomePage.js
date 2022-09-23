import React from "react";
import { Helmet } from "react-helmet";
import MemoryList from "./components/MemoryList";
const HomePage = (props) => {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: #add8e6; }"}</style>
      </Helmet>
      <MemoryList />
    </div>
  );
};

export default HomePage;
