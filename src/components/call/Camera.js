import React, { useRef, useState, useCallback } from 'react';
import { useUserMedia } from './useUserMedia';

const CAPTURE_OPTIONS = {
    audio: true,
    video: { facingMode: "environment" },
};

export default function Camera() {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [container, setContainer] = useState({ height: 0 });
//   const [aspectRatio, setAspectRatio] = useCardRatio(1.586); // default card ratio

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

//   function handleResize(contentRect) {
//     setContainer({
//       height: Math.round(contentRect.bounds.width / aspectRatio)
//     });
//   }

  function handleCanPlay() {
    // setAspectRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    videoRef.current.play();
  }

  return (
        <div style={{ height: 300}}>
          <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
        </div>
  );
}

function useCardRatio(initialRatio) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio);

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isLandscape = height <= width;
      const ratio = isLandscape ? width / height : height / width;

      setAspectRatio(ratio);
    }
  }, []);

  return [aspectRatio, calculateRatio];
}
