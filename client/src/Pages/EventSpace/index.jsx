// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries"; //  Query for getting sinlge capsule data
import LoadingScreen from "../../components/LoadingScreen";

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

  //* info for the image upload
  const [dataURL, setDataURL] = useState("");

  const [uploadImageData, setUploadImageData] = useState({
    capsuleId: eventId,
    owner: name,
    url: dataURL,
  });

  const [uploadImage, { error }] = useMutation(ADD_POST); // the mutation for uploading an image

  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/${eventId}`;

  //* Check for the name in local storage
  useEffect(() => {
    if (!name) {
      navigate(`/eventspace/${eventId}/attendeesignup`);
    }
  }, [name, navigate, eventId, setLocation]);

  //* This is the useEffect for the image upload
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
          setDataURL(result.info.url);
          setUploadImageData({
            ...uploadImageData,
            url: result.info.url,
          });
        }
      },
    );
  }, [saveFolder, uploadImageData]);

  // Query for getting sinlge capsule data by passing in the id
  const { loading, data, refetch } = useQuery(GET_CAPSULE, {
    variables: { id: eventId },
  });

  // useEffect for uploading the image and refetching the data for the page
  useEffect(() => {
    console.log("uploadImageData:");
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

  // //!! TODO
  const checkFileType = (post) => {
    const extension = post.url.split(".").pop();
    console.log("extension", extension);
    if (extension === "jpg" || extension === "png") {
      return <img
        width="500px"
        src={post.url}
        alt={post._id} // Call the function when the image is loaded.
      ></img>;
    } else if (extension === "mp4" || extension === "mov") {
      return <iframe
        src={`https://player.cloudinary.com/embed/?public_id=${post.url}&cloud_name=${process.env.REACT_APP_CLOUD_NAME}&player[muted]=true&player[autoplayMode]=on-scroll&player[autoplay]=true&player[loop]=true`}
        width="360"
        height="640"
        style={{ height: "100%", width: "100%", aspectRatio: "360 / 640" }} // hardcoded assumption of aspect ratio vert video
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        title={post._id}
      ></iframe>;
    } else {
      return <p>Invalid file type</p>;
    }
  };

  return (
    <section className="container m-auto">
      <h1>{cap.title}</h1>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        <Link to={`/eventspace/${eventId}/livechat`}>LiveChat</Link>
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => widgetRef.current.open()}
      >
        Upload
      </button>
      <ul className="flex w-full flex-wrap">
        {cap.posts
          .slice()
          .reverse()
          .map((post) => (
            <Suspense fallback={<LazyLoadingScreen />}>
              <li
                key={`postId_${post._id}`}
                className="w-1/3 p-1 md:w-1/3 lg:w-1/4 xl:w-1/4"
              >
                <h3>{post.title}</h3>
                <Link to={`/eventspace/${eventId}/singleview/${post._id}`}>
                  {checkFileType(post)}
                </Link>
              </li>
            </Suspense>
          ))}
      </ul>
    </section>
  );
}
