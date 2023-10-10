// Single View for any video or photo with a comment section


const style = {
  height: "auto",
  width: "500px",
  aspectRatio: "2/1",
  border: "0",
};

// DEMO VIDEO in there
export default function SingleView ({ cloudName, videoId }) {
  

  console.log("cloudName", cloudName);
  console.log("videoId", videoId);

  return (
    <div className="body">
      <section className="contentSection">
        <h1>Single View Page</h1>
        <div>
          <h3>this is a video iframe tag</h3>
          <iframe
            title="shoes"
            src={`https://res.cloudinary.com/${cloudName}/video/upload/v1696603416/${videoId}`}
            style={style}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          ></iframe>
          <h3>this is a photo img tag</h3>
          <img
            width="500px"
            src={`https://res.cloudinary.com/dp0h5vpsz/image/upload/v1696603392/K_E_thumb_tunq8u.jpg`}
            alt="wedding"
          ></img>
        </div>
        <h3>Comment Section</h3>
        <p>Comments go here</p>
      </section>
    </div>
  );
};
