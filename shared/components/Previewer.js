import React from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";
import { observer } from "mobx-react";
import * as styles from "../utils/styles";
import { getHostingUrl } from "shared/utils/url";

const Previewer = observer(({ width, height, portfolio }) => {
  if (!portfolio) return null;

  let src = getHostingUrl({ subdomain: portfolio.subdomain, edit: true });

  return (
    <Embed
      boxShadow="md"
      rounded="md"
      width={width}
      height={height}
      src={src}
      data={portfolio.toJSON()}
    />
  );
});

export default Previewer;
