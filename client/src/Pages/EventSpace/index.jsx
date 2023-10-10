// The Event Space Page where all of the videos and photos will be displayed

import { useState } from "react";
import { Link } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { GET_CAPSULE } from "../../utils/queries";

export default function EventSpace() {
//   const [loading, data] = useQuery(GET_CAPSULE);

//   console.log(data);
//   if (loading) return <p>Loading...</p>; // This could be prettier

  return (
    <div>
      <h1>Event Space</h1>
      <Link to="/livechat">LiveChat</Link>
      <Link to="/singleview">SingleView</Link>
      <p>display title, and new photos and videos</p>
      {/* <ul>
        {data.capsule.map((capsule) => (
          <li key={data.posts._id}>
            <h3>{capsule.posts.title}</h3>
            <Link to={`/singleview/${capsule.posts._id}`}>
              <img src={capsule.posts.thumbnailUrl} alt={capsule.posts._id} />
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
