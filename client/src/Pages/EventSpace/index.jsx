// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries"; //  Query for getting sinlge capsule data
import { Orbit } from "@uiball/loaders";
import LoadingScreen from "../../components/LoadingScreen";

const LazyLoadingScreen = React.lazy(() =>
  import("../../components/LoadingScreen"),
); // Lazy-loading screen

//! Temporary styles for the loading spinner
const styleADiv = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E4DDD3",
};

//* The Event Space Page where all of the videos and photos will be displayed for a single event
export default function EventSpace() {
  const { eventId } = useParams(); // the params for the capsule id
  const navigate = useNavigate(); // the navigate function for redirecting
  const [name, setName] = useState(localStorage.getItem("name"));
  const [location, setLocation] = useState("");

  //* info for the image upload
  const [dataURL, setDataURL] = useState("");
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
          console.log("Done! Here is the image info: ", result.info);
          setDataURL(result.info.url);
        }
      },
    );
  }, [saveFolder]);

  // Query for getting sinlge capsule data by passing in the id
  const { loading, data } = useQuery(GET_CAPSULE, {
    variables: { id: eventId },
  });

  // Check for the capsule data
  const cap = data?.getCapsule || null;

  console.log("cap", cap);



  
  // display loading screen
  if (loading) return <LoadingScreen />;

  // if no cap, return a message
  if (!cap)
    return (
      <div style={styleADiv}>
        <p>No capsule found</p>
      </div>
    );

  //TODO - Use mutation to save URL into database then update the page with the new image at the top

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
        {cap.posts.map((post) => (
          <Suspense fallback={<LazyLoadingScreen />}>
            <li key={post._id} className="w-1/3 p-1 md:w-1/3 lg:w-1/4 xl:w-1/4">
              <h3>{post.title}</h3>
              <Link to={`/eventspace/${eventId}/singleview/${post._id}`}>
                <img src={post.url} alt={post._id} />
              </Link>
            </li>
          </Suspense>
        ))}
      </ul>
    </section>
  );
}
