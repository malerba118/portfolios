import React from "react";

const Embed = ({ data, ...otherProps }) => {
  return <iframe {...otherProps} />;
};

export default Embed;
