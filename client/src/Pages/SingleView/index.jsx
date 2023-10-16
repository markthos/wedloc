// Single View for any video or photo with a comment section

import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_POST } from "../../utils/queries";

import dayjs from "dayjs";
import StyledButton from "../../components/StyledButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { UPVOTE } from "../../utils/mutations";

const LazyLoadingScreen = React.lazy(() => import('../../components/LoadingScreen'));

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
  const { eventId, postId } = useParams();
  const navigate = useNavigate();

  const [imgFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [isImageLoaded, setImageLoaded] = useState(false);

  const [storedLike, setStoredLike] = useState(
    localStorage.getItem(`${postId}`) || false,
  );

  const [commentView, setCommentView] = useState(false);

  const { loading, data } = useQuery(GET_POST, {
    variables: { capsuleId: eventId, postId: postId },
  });

  const postData = data?.getPost || "";

  console.log(postData.url);

  const [upVoteDatabase, { error }] = useMutation(UPVOTE, {
    variables: { capsuleId: eventId, postId: postId },
  });

  const [upvoteTotal, setUpvoteTotal] = useState(0);
  const [commentTotal, setCommentTotal] = useState(0);

  useEffect(() => {
    setUpvoteTotal(postData.upVotes);
  }, [postData]);
  //TODO save to database on like and unlike

  //TODO save commnet to database

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
  }, []);

  // if (loading)
  //   return (
  //     <LazyLoadingScreen /> 
  //   );

  const handleForward = () => {
    console.log("forward");
  };

  const handleBackward = () => {
    console.log("backward");
  };

  const handleReturn = () => {
    navigate(`/eventspace/${eventId}`);
  };

  const upVote = async () => {
    if (storedLike) {
      localStorage.removeItem(`${postId}`);
    } else {
      const returned = await upVoteDatabase({
        variables: { capsuleId: eventId, postId: postId },
      });
      setUpvoteTotal(returned.data.upVote.upVotes);
      localStorage.setItem(`${postId}`, "True");
    }
    setStoredLike(!storedLike);
  };

  if (!name) {
    navigate(`/attendeesignup/${eventId}`);
  }

  const handleImageLoad = () => {
    // Set the state to indicate that the image has loaded.
    setImageLoaded(true);
  };

  return (
    <section className="gap container m-auto flex w-96 flex-col justify-center">
      <h1 className="center flex justify-center ">
        posted by: {postData.owner} on
        {dayjs(postData.date).format("MM-DD-YYYY")}
      </h1>
      <div className="m-4 flex justify-center gap-4 ">
        <button onClick={handleForward}>
          <ChevronLeftIcon />
        </button>
        <Suspense fallback={<LazyLoadingScreen />}>
          <img
            width="500px"
            src={postData.url}
            alt={postData._id}
            onLoad={handleImageLoad} // Call the function when the image is loaded.
          ></img>
        </Suspense>
        {videoFile && (
          <iframe
            title={postData._id}
            src={postData.url}
            style={style}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          ></iframe>
        )}
        <button onClick={handleBackward}>
          <ChevronRightIcon />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row items-center justify-center">
          <div className="relative">
            <IconButton onClick={upVote}>
              {storedLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            {upvoteTotal > 0 && (
              <p className="absolute right-0 top-0">{upvoteTotal}</p>
            )}
          </div>
          <div>
            <IconButton onClick={() => setCommentView(!commentView)}>
              <MessageIcon />
            </IconButton>
            {commentTotal > 0 && (
              <p className="absolute right-0 top-0">{commentTotal}</p>
            )}
          </div>
        </div>

        <StyledButton
          primaryColor
          onClick={handleReturn}
        >Back</StyledButton>
      </div>
      {commentView && (
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
            <StyledButton type="submit" primaryColor displayText={"Submit"} />
          </form>
        </div>
      )}
    </section>
  );
}
