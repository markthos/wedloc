// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams } from "react-router-dom"; 

import { useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries"; //  Query for getting sinlge capsule data

import { Orbit } from '@uiball/loaders'

//! Temporary styles for the images
const eventStyles = {
  display: "flex",
  flexWrap: "wrap",
  flex: "1 1 0",
  gap: "1rem",
}

//! Temporary styles for the loading spinner
const styleADiv = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

//* The Event Space Page where all of the videos and photos will be displayed for a single event
export default function EventSpace() {
  const { id } = useParams(); // the params for the capsule id

  console.log(id);

  // Query for getting sinlge capsule data by passing in the id
  const { loading, data } = useQuery(GET_CAPSULE, {
    variables: { id: id },
  });

  // Check for the capsule data
  const cap = data?.getCapsule || null;
  
  if (loading) return <Orbit size={200} color="#E4DDD3" style={styleADiv} />; // loading before images shown - This could be prettier

  if (!cap) return <p>No capsule found</p>; // This could be prettier

  // 
  console.log("Here :" + JSON.stringify(cap, null, 2));
  console.log("posts: " + cap.posts[0].thumbnail)

  return (
    <div className="body">
      <section className="contentSection">
        <h1>Event Space</h1>
      
      <Link to="/livechat">LiveChat</Link>
      <Link to="/singleview">SingleView</Link>
      <p>display title, and new photos and videos</p>

      <ul style={eventStyles}>
        {cap.posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <Link to={`/singleview/${post._id}`}>
              <img width="100px" src={post.thumbnail} alt={post._id} />
            </Link>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
}
