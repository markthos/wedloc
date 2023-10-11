// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries"; //  Query for getting sinlge capsule data

import { Orbit } from "@uiball/loaders";

//! Temporary styles for the images
const eventStyles = {
  display: "flex",
  flexWrap: "wrap",
  flex: "0 0 33.333333%",
  flexWrap: "wrap",
  gap: "1rem",
};

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
  const { eventID } = useParams(); // the params for the capsule id

  // Query for getting sinlge capsule data by passing in the id
  const { loading, data } = useQuery(GET_CAPSULE, {
    variables: { id: eventID },
  });

  // Check for the capsule data
  const cap = data?.getCapsule || null;

  // display loading screen
  if (loading)
    return (
      <div style={styleADiv}>
        <Orbit size={200} color="white" />
      </div>
    );

  // if no cap, return a message
  if (!cap)
    return (
      <div style={styleADiv}>
        <p>No capsule found</p>
      </div>
    );

  //
  console.log("Here :" + JSON.stringify(cap, null, 2));
  console.log("posts: " + cap.posts[0].thumbnail);

  return (
    <div className="body">
      <section className="contentSection">
        <h1>{cap.title}</h1>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/livechat">LiveChat</Link>
        </button>
        <button>
          <Link to="/upload">Upload</Link>
        </button>
        <ul style={eventStyles}>
          {cap.posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <Link to={`/eventspace/${eventID}/singleview/${post._id}`}>
                <img width="100px" src={post.url} alt={post._id} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
