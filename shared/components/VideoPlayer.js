import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import _ from "lodash";
import Preload from "preload-it";

const preload = Preload();

const FRAME_RATE = 59.94;
const TIME_STEP = 1 / FRAME_RATE;

const VideoPlayer = forwardRef(({ src, ...otherProps }, ref) => {
  const videoRef = useRef(null);
  const [objUrl, setObjUrl] = useState(null);

  useImperativeHandle(ref, () => ({
    seek: _.throttle((progress) => {
      videoRef.current.currentTime =
        Math.round(progress * videoRef.current.duration * FRAME_RATE) /
          FRAME_RATE -
        TIME_STEP / 2;
    }, 40),
  }));

  useEffect(() => {
    preload.fetch([src]).then((result) => {
      setObjUrl(preload.getItemByUrl(src));
    });
  }, [src]);

  if (!objUrl) {
    return null;
  }

  return <video src={objUrl.blobUrl} ref={videoRef} muted />;
});

export default VideoPlayer;
