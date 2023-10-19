// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries"; //  Query for getting single capsule data
import LoadingScreen from "../../components/LoadingScreen";
import EventHeader from "../../components/EventHeader";
import StyledButton from "../../components/StyledButton";
import FilterToggle from "./FilterToggle";

import { ADD_POST } from "../../utils/mutations";

const LazyLoadingScreen = React.lazy(() =>
  import("../../components/LoadingScreen"),
); // Lazy-loading screen

//* The Event Space Page where all of the videos and photos will be displayed for a single event
export default function EventSpace() {
  const { eventId } = useParams(); // the params for the capsule id
  const navigate = useNavigate(); // the navigate function for redirecting
  const [name, setName] = useState(localStorage.getItem("name"));
  const [location, setLocation] = useState("");

  const [sortByUpvotes, setSortByUpvotes] = useState(false); // State to track sorting method

  const [dataURL, setDataURL] = useState(""); // the data url for the image

  const [uploadImageData, setUploadImageData] = useState({
    capsuleId: eventId,
    owner: name,
    url: dataURL,
  });

  const [uploadImage, { error }] = useMutation(ADD_POST); // the mutation for uploading an image

  // cloudinary setup
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/${eventId}`;

  // Check for the name in local storage
  useEffect(() => {
    if (!name) {
      navigate(`/eventspace/${eventId}/attendeesignup`);
    }
  }, [name, navigate, eventId, setLocation]);

  // This is the useEffect for the image upload
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        folder: saveFolder,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setDataURL(result.info.secure_url);
          setUploadImageData({
            ...uploadImageData,
            url: result.info.secure_url,
          });
        }
      },
    );
  }, [saveFolder, uploadImageData]);

  // Query for getting single capsule data by passing in the id
  const { loading, data, refetch } = useQuery(GET_CAPSULE, {
    variables: { id: eventId },
  });

  // useEffect for uploading the image and refetching the data for the page
  useEffect(() => {
    const uploadAndFetch = async () => {
      if (dataURL) {
        try {
          await uploadImage({ variables: uploadImageData });
          refetch();
        } catch (error) {
          console.error("Error from uploadImage mutation:", error);
        }
      }
    };

    uploadAndFetch();
  }, [uploadImageData]);

  // Check for the capsule data
  const cap = data?.getCapsule || null;

  // display loading screen
  if (loading) return <LoadingScreen />;

  // if no cap, return a message
  if (!cap)
    return (
      <div>
        <p>No capsule found</p>
      </div>
    );

  // conditionally render the image or video
  const checkFileType = (post) => {
    const extension = post.url.split(".").pop(); // grab the file extension at the end of the url
    if (extension === "jpg" || extension === "png") {
      return (
        <Link to={`/eventspace/${eventId}/singleview/${post._id}`}>
          <img
            className="aspect-square h-full w-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-80"
            src={post.url}
            alt={post._id} // Call the function when the image is loaded.
          ></img>
        </Link>
      );
    } else if (extension === "mp4" || extension === "mov") {
      return (
        // video player in a div because the link needed to sit on top of the iframe, scale 2 to make it fit square
        <div className="relative h-full w-full overflow-hidden">
          <iframe
            src={`https://player.cloudinary.com/embed/?public_id=${post.url}&cloud_name=${process.env.REACT_APP_CLOUD_NAME}&player[controls]=false&player[muted]=true&player[autoplayMode]=on-scroll&player[autoplay]=true&player[loop]=true`}
            className="aspect-square h-full w-full scale-[2] object-cover" // hardcoded assumption of aspect ratio vert video
            title={post._id}
          ></iframe>
          <Link
            to={`/eventspace/${eventId}/singleview/${post._id}`}
            className="absolute inset-0 z-10 h-full w-full"
          ></Link>
        </div>
      );
      // return <VideoPlayer video={post.url} width="auto" height="auto" />
    } else {
      return <p>Invalid file type</p>;
    }
  };

  // Handle the sorting change
  const handleSortChange = (sortByUpvotes) => {
    setSortByUpvotes(sortByUpvotes);
    refetch();
  };

  return (
    <>
      <EventHeader
        eventProfileImage={cap.eventPic}
        eventTitle={cap.title}
        eventDate={cap.date}
        eventLocation={cap.location}
      >
        <Link to={`/eventspace/${eventId}/livechat`}>
          <StyledButton outlined button>
            Live Chat
          </StyledButton>
        </Link>

        <StyledButton outlined button onClick={() => widgetRef.current.open()}>
          Upload
        </StyledButton>
        <Link to={`/eventspace/${eventId}/qrcode`}>
          <StyledButton outlined button>
            QR Code
          </StyledButton>
        </Link>
      </EventHeader>

      <div className="mb-3 flex justify-center">
        <FilterToggle onChange={handleSortChange} />
      </div>

      <section className="container m-auto mb-5 px-1">
        <Suspense fallback={<LazyLoadingScreen />}>
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {cap.posts
              .slice()
              .sort((a, b) =>
                sortByUpvotes ? b.upVotes - a.upVotes : b.date - a.date,
              )
              .map((post) => (
                <div key={`postId_${post._id}`}>
                  <h3>{post.title}</h3>
                  {checkFileType(post)}
                </div>
              ))}
          </div>
        </Suspense>
      </section>
    </>
  );
}
