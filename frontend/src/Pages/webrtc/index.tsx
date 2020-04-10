import React, { useEffect, useRef, MutableRefObject, useState } from "react";

/**
 * @description
 * @returns {string}
 */
function useVideoStream(): MutableRefObject<HTMLVideoElement> | string {
  const [err, setErr] = useState<string>();
  const peerConnection = new RTCPeerConnection();
  const vid = useRef(document.createElement("video"));
  const onSucccess: NavigatorUserMediaSuccessCallback = (stream) => {
    vid.current.srcObject = stream;
    stream.getTracks().forEach((track) => { peerConnection.addTrack(track, stream); });
    peerConnection.createOffer()
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        console.log(JSON.stringify(peerConnection.localDescription, null, "\t"));
      });
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
  });
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
