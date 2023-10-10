// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries";

export default function EventSpace() {
  const { id } = useParams();

  console.log(id);

  const { loading, data } = useQuery(GET_CAPSULE, {
    variables: { id: id },
  });

  const cap = data?.getCapsule || "";
  
  if (loading) return <p>Loading...</p>; // This could be prettier

  console.log("Here :" + JSON.stringify(cap, null, 2));

  return (
    <div className="body">
      <section className="contentSection">
        <h1>Event Space</h1>
      </section>
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
