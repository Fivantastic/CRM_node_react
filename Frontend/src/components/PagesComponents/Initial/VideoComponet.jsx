import { useRef, useEffect } from 'react';

const VideoComponent = ({ isSmallScreen }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // This effect ensures the video starts playing if it is paused
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <video className="video-Movil" src="/tierraMovil.mp4" ref={videoRef} autoPlay loop muted preload="metadata" />
      ) : (
        <video className="video-cosmic-intro" src="/tierra.mp4" ref={videoRef} autoPlay loop muted disablePictureInPicture preload="metadata" />
      )}
    </div>
  );
};

export default VideoComponent;
