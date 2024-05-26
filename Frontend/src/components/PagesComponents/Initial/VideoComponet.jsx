import { useRef, useEffect } from 'react';

const VideoComponent = ({ isSmallScreen }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <video className="video-Movil" src="/tierraMovil.mp4" ref={videoRef} autoPlay loop muted preload="metadata" />
      ) : (
        <video className="video-cosmic-intro" src="/Earth_Orb 24.mp4" ref={videoRef} autoPlay loop muted disablePictureInPicture preload="metadata" />
      )}
    </div>
  );
};

export default VideoComponent;
