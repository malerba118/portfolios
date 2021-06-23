import React from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";

const Previewer = ({ device, portfolio }) => {
  if (!portfolio) return null;

  let src;
  if (isDev) {
    src = "http://localhost:3001?edit=true&subdomain=" + portfolio.subdomain;
  } else {
    src = `https://${portfolio.subdomain}.portfolios.us?edit=true`;
  }

  return <Embed src={src} data={portfolio.draft} />;
};

export default Previewer;
