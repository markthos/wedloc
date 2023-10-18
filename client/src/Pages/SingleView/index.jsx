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
import { IconButton } from "@mui/material";
import { UPVOTE, DOWNVOTE, ADD_COMMENT } from "../../utils/mutations";
import LoadingScreen from "../../components/LoadingScreen";
import StyledFormInput from "../../components/StyledFormInput";
import DeleteButton from "./DeleteButton";
import DeleteForever from "@mui/icons-material/DeleteForever";

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

  const deletePost = async () => {
    await DeleteButton(eventId, postId);
    navigate(`/eventspace/${eventId}`);
  };

  return (
    <>
    {/* Image/Video section */}
      <section className="flex flex-col justify-center">
        <div className="flex justify-center bg-black py-5">
        
          {imgFile && (
            <Suspense fallback={<LazyLoadingScreen />}>
              <img
                className="h-full w-[40vw] object-cover"
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
        </div>
      </section>

      <section>
        {/* Posted By Section */}
        <div className="my-2 mr-1 flex justify-end gap-1">
          <p>{postData.owner} on </p>
          <UnixTimestampConverter unixTimestamp={postData.date} type="post" />
        </div>

        {/* Like, and comment section */}
        <div className="ml-1 mr-2 flex justify-between">
          <div className="flex flex-row items-center justify-center">
            <div className="relative">
              <IconButton onClick={upVote}>
                {storedLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              {upvoteTotal > 0 && (
                <p className="absolute right-0 top-0">{upvoteTotal}</p>
              )}
            </div>
            <div className="relative">
              <IconButton onClick={() => setCommentView(!commentView)}>
                <MessageIcon />
              </IconButton>
              {commentTotal && (
                <p className="absolute right-0 top-0">{commentTotal}</p>
              )}
            </div>
            <div className="relative">
              <IconButton onClick={deletePost}>
                <DeleteForever />
              </IconButton>
            </div>
          </div>
        </div>
        {commentView && (
          <div className="m-4 flex flex-col text-center">
            <h3>Comment Section</h3>
            <ul className="flex flex-col gap-2">
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
              className="mb-6 mt-6 flex items-center justify-between gap-3"
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
        <StyledButton primaryColor onClick={handleReturn}>
          Back
        </StyledButton>
      </section>
    </>
  );
}
