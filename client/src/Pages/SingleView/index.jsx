// Single View for any video or photo with a comment section

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, redirect } from "react-router-dom";
import { GET_POST } from "../../utils/queries";
import { Orbit } from "@uiball/loaders";
import dayjs from "dayjs";

const style = {
  height: "80vh",
  width: "500px",
  aspectRatio: "2/1",
  border: "0",
};

const styleADiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E4DDD3",
};

// DEMO VIDEO in there
export default function SingleView({ cloudName, videoId }) {
  const [imgFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "anonymous");

  const { eventId, postId } = useParams();

  const { loading, data } = useQuery(GET_POST, {
    variables: { capsuleId: eventId, postId: postId },
  });

  const postData = data?.getPost;

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

  const handleForward = () => {
    console.log("forward");
  };

  const handleBackward = () => {
    console.log("backward");
  };

  return (
    <main className="min-screen h-100 flex justify-center overflow-hidden bg-main_bg">
      <section className="gap container m-auto flex flex-col justify-center">
        <div className="m-4 flex justify-center gap-4 ">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleBackward}
          >
            {"<"}
          </button>
          {imgFile && (
            <img width="500px" src={postData.url} alt={postData._id}></img>
          )}
          {videoFile && (
            <iframe
              title={postData._id}
              src={postData.url}
              style={style}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            ></iframe>
          )}
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleForward}
          >
            {">"}
          </button>
        </div>
        <div className="flex flex-col content-center justify-center">
          <h1 className="center flex justify-center ">
            posted by: {postData.owner} on{" "}
            {dayjs(postData.date).format("MM-DD-YYYY")}
          </h1>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleForward}
          >
            Back
          </button>
        </div>

        <div className="m-4 flex flex-col text-center">
          <h3>Comment Section</h3>
          <ul className="flex flex-col gap-2">
            {postData.comments.map((comment) => (
              <li key={comment._id}>
                <div className="flex justify-between">
                  <h3>{comment.author}</h3>
                  <p>{comment.date}</p>
                </div>
                {name === comment.author ? (
                  <p className="flex justify-end bg-gray-300 text-center">
                    {comment.text}
                  </p>
                ) : (
                  <p className="flex justify-start bg-gray-300 text-center">
                    {comment.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <form className="w-100% mb-6 mt-6 flex flex-col gap-6">
            <input
              type="textarea"
              name="newComment"
              className="resize"
              placeholder="Comment..."
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
