import React, { useEffect, useRef, MutableRefObject, useState } from "react";

/**
 * @description
 * @returns {string}
 */
function useVideoStream(): MutableRefObject<HTMLVideoElement> | string {
  const [err, setErr] = useState<string>();
  const vid = useRef(document.createElement("video"));
  const onSucccess: NavigatorUserMediaSuccessCallback = (data) => {
    vid.current.srcObject = data;
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        height : 1024,
        width  : 768,
      },
    })
      .then(onSucccess)
      .catch((error: Error) => {
        if (error.message.includes("not allowed")) {
          setErr("This feature requires access of camera!");
        } else setErr(error.message);
      });
  }, []);
  return err || vid;
}

export default (): JSX.Element => {
  const vidSrc = useVideoStream();
  return (
    typeof vidSrc === "string"
      ? <p>{vidSrc}</p>
      : (
        <video ref={vidSrc} autoPlay>
          <track kind="captions" />
        </video>
      )
  );
};
