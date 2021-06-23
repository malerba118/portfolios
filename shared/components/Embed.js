import React, { useRef, useEffect, useState } from "react";

const Embed = ({ data, ...otherProps }) => {
  const iframeRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      iframeRef.current?.contentWindow?.postMessage(data, "*");
    }
  }, [data, loaded]);

  return (
    <iframe ref={iframeRef} onLoad={() => setLoaded(true)} {...otherProps} />
  );
};

export default Embed;
