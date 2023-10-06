const style = {
  height: "auto",
  width: "auto",
  border: "0",
};

// DEMO VIDEO in there
const SingleView = ({ cloudName, videoId }) => {
  console.log("cloudName", cloudName);
  console.log("videoId", videoId);

  return (
    <>
      <h1>SingleView</h1>
      <iframe
        title="shoes"
        src={`https://res.cloudinary.com/${cloudName}/video/upload/v1696603416/${videoId}`}
        style={style}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      ></iframe>
      <img width="500px" src={`https://res.cloudinary.com/${cloudName}/video/upload/v1696603416/${videoId}`}>

      </img>
      <h3>Comment Section</h3>
    </>
  );
};

export default SingleView;
