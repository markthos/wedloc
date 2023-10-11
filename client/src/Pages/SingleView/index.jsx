// Single View for any video or photo with a comment section

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, redirect } from "react-router-dom";
import { GET_POST } from "../../utils/queries";
import { Orbit } from "@uiball/loaders";

const style = {
  height: "auto",
  width: "500px",
  aspectRatio: "2/1",
  border: "0",
};

const styleADiv = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E4DDD3",
};

// DEMO VIDEO in there
export default function SingleView({ cloudName, videoId }) {
  const [imgFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);

  const { eventId, postId } = useParams();

  console.log("eventId", eventId);
  console.log("postId", postId);

  const {loading, data} = useQuery(GET_POST, {
    variables: { capsuleId: eventId, postId: postId },
  });

  const postData = data?.getPost;

  console.log("data", postData);

  useEffect(() => {
    if (data) {
      const extension = postData.url.split(".").pop();
      console.log("extension", extension);
      if (extension === "jpg" || extension === "png") {
        setImageFile(true);
        setVideoFile(false);
      } else if (extension === "mp4" || extension === "mov") {
        setImageFile(false);
        setVideoFile(true);
      } else {
        setImageFile(false);
        setVideoFile(false);
      }
    }
  }, [data]);

  if (loading)
    return (
      <div style={styleADiv}>
        <Orbit size={200} color="white" />
      </div>
    );




  return (
    <div className="body">
      <section className="contentSection">
        <h1>Single View Page</h1>
        <div>
          {imgFile && (
            <img
              width="500px"
              src={postData.url}
              alt={postData._id}
            ></img>
          )}
          {videoFile && (
            <iframe
              title={postData._id}
              src={postData.url}
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
