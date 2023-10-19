// Single View for any video or photo with a comment section
import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";

import auth from "../../utils/auth";

//timestamp converter
import UnixTimestampConverter from "../../components/UnixTimestampConverter";

// Components
import StyledButton from "../../components/StyledButton";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import StyledFormInput from "../../components/StyledFormInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Mutations and Queries
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST } from "../../utils/queries";
import {
  UPVOTE,
  DOWNVOTE,
  ADD_COMMENT,
  DELETE_POST,
} from "../../utils/mutations";

// loading screens
import LoadingScreen from "../../components/LoadingScreen";
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

  // mutation for deleting a post
  const [deletePostDatabase, { error4 }] = useMutation(DELETE_POST, {
    variables: { capsuleId: eventId, postId: postId },
  });

  // set upvote total on load
  useEffect(() => {
    setUpvoteTotal(postData.upVotes);
    setCommentTotal(postData.comment_count);
  }, [postData]);

  // set image or video file on load
  useEffect(() => {
    if (postData) {
      const extension = postData.url.split(".").pop();
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

  // if loading return loading screen
  if (loading) return <LoadingScreen />;

  // if error return error
  const handleReturn = () => {
    navigate(`/eventspace/${eventId}`);
  };

  // upvote function
  const upVote = async () => {
    // if user has already liked the post (saved on local storage), remove like
    if (storedLike) {
      const downvoted = await downVoteDatabase();
      localStorage.removeItem(`${postId}`);
      setStoredLike(false);
      setUpvoteTotal(downvoted.data.downVote.upVotes);
    } else {
      // else add like
      const upvoted = await upVoteDatabase();
      localStorage.setItem(`${postId}`, "True");
      setStoredLike(true);
      setUpvoteTotal(upvoted.data.upVote.upVotes);
    }
  };

  // if no name in local storage, navigate to sign up page
  if (!name) {
    navigate(`/attendeesignup/${eventId}`);
  }

  // add comment function
  const handleNewComment = async (event) => {
    event.preventDefault();

    // grab text and save it to the database
    const text = event.target.newComment.value;
    await addCommentDatabase({
      variables: {
        text: text,
      },
    });

    // update the comments
    refetch();

    event.target.newComment.value = "";
  };

  // delete post function
  const handleDelete = async () => {
    await deletePostDatabase();
    navigate(`/eventspace/${eventId}`);
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
            <div className="relative ">
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
            {auth.loggedIn() && (
              <IconButton onClick={handleDelete}>
                <DeleteOutlineIcon fontSize="large" />
              </IconButton>
            )}
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
                    <p className="flex justify-end  bg-lightgray px-2 py-1 text-center font-bold rounded-lg">
                      {comment.text}
                    </p>
                  ) : (
                    <p className="flex justify-start bg-white px-2 py-1 text-center rounded-lg">
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
