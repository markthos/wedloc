// Single View for any video or photo with a comment section

import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_POST } from "../../utils/queries";
import UnixTimestampConverter from "../../components/UnixTimestampConverter";
import StyledButton from "../../components/StyledButton";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Icon, IconButton } from "@mui/material";
import { UPVOTE, DOWNVOTE, ADD_COMMENT } from "../../utils/mutations";
import LoadingScreen from "../../components/LoadingScreen";
import StyledFormInput from "../../components/StyledFormInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Lazy-loading screen
const LazyLoadingScreen = React.lazy(() =>
  import("../../components/LoadingScreen"),
);

// DEMO VIDEO in there
export default function SingleView({ cloudName, videoId }) {
  const { eventId, postId } = useParams();
  const navigate = useNavigate();
  const [imgFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [isImageLoaded, setImageLoaded] = useState(false);

  // state of current user like status saved to local storage
  const [storedLike, setStoredLike] = useState(
    localStorage.getItem(`${postId}`) || false,
  );

  // Set the view of the comments on or off
  const [commentView, setCommentView] = useState(false);

  // states for upvote total
  const [upvoteTotal, setUpvoteTotal] = useState(0);
  // state for comment total
  const [commentTotal, setCommentTotal] = useState(0);

  // query for post data
  const { loading, data, refetch } = useQuery(GET_POST, {
    variables: { capsuleId: eventId, postId: postId },
  });

  const [postData, setPostData] = useState("");

  useEffect(() => {
    setPostData(data?.getPost || "");
  }, [data]);
  // data from query

  // mutation for upvoting
  const [upVoteDatabase, { error }] = useMutation(UPVOTE, {
    variables: { capsuleId: eventId, postId: postId },
  });

  // mutation for  downvoting
  const [downVoteDatabase, { error2 }] = useMutation(DOWNVOTE, {
    variables: { capsuleId: eventId, postId: postId },
  });

  // mustation for adding a comment
  const [addCommentDatabase, { error3 }] = useMutation(ADD_COMMENT, {
    variables: { capsuleId: eventId, postId: postId, author: name, text: "" },
  });

  useEffect(() => {
    setUpvoteTotal(postData.upVotes);
  }, [postData]);

  useEffect(() => {
    setCommentTotal(postData.comment_count);
  }, [postData]);

  useEffect(() => {
    if (postData) {
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
  }, [postData]);

  if (loading) return <LoadingScreen />;

  const handleReturn = () => {
    navigate(`/eventspace/${eventId}`);
  };

  const upVote = async () => {
    if (storedLike) {
      const downvoted = await downVoteDatabase();
      localStorage.removeItem(`${postId}`);
      setStoredLike(false);
      setUpvoteTotal(downvoted.data.downVote.upVotes);
    } else {
      const upvoted = await upVoteDatabase();
      localStorage.setItem(`${postId}`, "True");
      setStoredLike(true);
      setUpvoteTotal(upvoted.data.upVote.upVotes);
    }
  };

  if (!name) {
    navigate(`/attendeesignup/${eventId}`);
  }

  // Set the state to indicate that the image has loaded.
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleNewComment = async (event) => {
    event.preventDefault();

    const text = event.target.newComment.value;
    await addCommentDatabase({
      variables: {
        text: text,
      },
    });

    refetch();

    event.target.newComment.value = "";
  };

  const handleDelete = async () => {
    console.log("Delete This Post");
  };

  return (
    <>
      <section className="flex flex-col bg-beige">
        {/* Image/Video section */}
        <div className="m-auto px-2 py-5 md:w-[60vw] md:px-0 lg:w-[40vw]">
          {imgFile && (
            <Suspense fallback={<LazyLoadingScreen />}>
              <img
                className="mb-4 h-full w-full object-cover shadow-xl"
                src={postData.url}
                alt={postData._id}
                onLoad={handleImageLoad} // Call the function when the image is loaded.
              ></img>
            </Suspense>
          )}
          {videoFile && (
            <iframe
              src={`https://player.cloudinary.com/embed/?public_id=${postData.url}&cloud_name=${process.env.REACT_APP_CLOUD_NAME}&player[muted]=true&player[autoplayMode]=on-scroll&player[autoplay]=true&player[loop]=true`}
              width="360"
              height="640"
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: "360 / 640",
              }} // hardcoded assumption of aspect ratio vert video
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title={postData._id}
            ></iframe>
          )}
          {/* Posted By / On Date */}
          <div className="flex justify-end gap-1">
            <p>Posted by {postData.owner} on </p>
            <UnixTimestampConverter unixTimestamp={postData.date} type="post" />
          </div>
        </div>
      </section>

      <section className="mb-4 flex flex-col items-start md:items-center">
        {/* Like, Comment, Delete Icons */}
        <div className="flex w-full justify-between md:w-[40vw] lg:w-[40vw]">
          <div className="flex">
            {/* Like Icon */}
            <div className="relative">
              <IconButton onClick={upVote}>
                {storedLike ? (
                  <FavoriteIcon fontSize="large" />
                ) : (
                  <FavoriteBorderIcon fontSize="large" />
                )}
              </IconButton>
              {upvoteTotal > 0 && (
                <p className="absolute right-0 top-0">{upvoteTotal}</p>
              )}
            </div>
            {/* Comment Icon to open comments view */}
            <div className="relative">
              <IconButton onClick={() => setCommentView(!commentView)}>
                <MessageIcon fontSize="large" />
              </IconButton>
              {commentTotal && (
                <p className="absolute right-0 top-0">{commentTotal}</p>
              )}
            </div>
          </div>
          {/* Delete Icon */}
          <div>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {/* Comment Section */}
        {commentView && (
          <div className="flex w-full flex-col px-2 md:w-[60vw] md:px-0 lg:w-[40vw]">
            <h3 className="text-center font-bold">Comment Section</h3>
            <ul className="mb-4 flex flex-col gap-2">
              {postData.comments.map((comment) => (
                <li key={`commentId_${comment._id}`}>
                  <div className="flex justify-between">
                    <h3>{comment.author}</h3>
                    <UnixTimestampConverter
                      unixTimestamp={comment.date}
                      type="comment"
                    />
                  </div>
                  {name === comment.author ? (
                    <p className="flex justify-end  bg-white text-center font-extrabold">
                      {comment.text}
                    </p>
                  ) : (
                    <p className="flex justify-start bg-white text-center font-extrabold">
                      {comment.text}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {/* Comment Form */}
            <form
              className="flex items-baseline gap-3"
              onSubmit={handleNewComment}
            >
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"newComment"}
                placeholder={"Comment..."}
                required
              />
              <StyledButton submit primaryColor>
                Send
              </StyledButton>
            </form>
          </div>
        )}
        <div className="flex w-full justify-center">
          <StyledButton primaryColor onClick={handleReturn}>
            Back
          </StyledButton>
        </div>
      </section>
    </>
  );
}
