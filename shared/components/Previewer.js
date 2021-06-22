import React from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";

const Previewer = ({ device, portfolio }) => {
  if (!portfolio) return null;

  let src;
  if (isDev) {
    src = "http://localhost:3001?subdomain=" + portfolio.subdomain;
  } else {
    src = `https://${portfolio.subdomain}.portfolios.us`;
  }

  return <Embed src={src} data={portfolio} />;
};

export default Previewer;
