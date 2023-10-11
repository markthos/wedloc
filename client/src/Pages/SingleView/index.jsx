// Single View for any video or photo with a comment section

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams, redirect } from "react-router-dom";
import { GET_POST } from "../../utils/queries";

const style = {
  height: "auto",
  width: "500px",
  aspectRatio: "2/1",
  border: "0",
};

// DEMO VIDEO in there
export default function SingleView({ cloudName, videoId }) {
  const [imgFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);

  const { eventID, postID } = useParams();

  console.log("eventID", eventID);
  console.log("postID", postID);

  const [loading, data] = useQuery(GET_POST, {
    variables: { id: postID },
  });

  console.log("data", data);

  const post = data?.url || null;

  const extension = post.split(".").pop();

  if (extension === "jpg" || extension === "png") {
    setImageFile(true);
  } else if (extension === "mp4" || extension === "mov") {
    setVideoFile(true);
  } else return <redirect to={`/eventspace/${eventID}`} />;

  return (
    <div className="body">
      <section className="contentSection">
        <h1>Single View Page</h1>
        <div>
          {imgFile && (
            <img
              width="500px"
              src={`https://res.cloudinary.com/dp0h5vpsz/image/upload/v1696603392/K_E_thumb_tunq8u.jpg`}
              alt="wedding"
            ></img>
          )}
          {videoFile && (
            <iframe
              title="shoes"
              src={`https://res.cloudinary.com/${cloudName}/video/upload/v1696603416/${videoId}`}
              style={style}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            ></iframe>
          )}
        </div>
        <h3>Comment Section</h3>
        <p>Comments go here</p>
      </section>
    </div>
  );
}
