import React from "react";

const Headline = (props) => {
  const { lable } = props;
  return (
    <div>
      <h2>{lable}</h2>
    </div>
  );
};

export default Headline;
