import { useEffect, useRef } from "react";

const VideoPlayer = (props) => {
  const { video } = props;
  const {width, height} = props;

  const cloudinaryRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if(cloudinaryRef.current) return;
    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: import.meta.env.REACT_APP_CLOUD_NAME
    })

  }, []);

  return <video 
    ref={videoRef}
    data-cld-id={video}
    width={width}
    hight={height}
    autoPlay
    loop
    muted
  />;
};

export default VideoPlayer;
