// The Event Space Page where all of the videos and photos will be displayed

import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CAPSULE } from "../../utils/queries";

export default function EventSpace() {

  const {id} = useParams()

  console.log(id)

  const [loading, error, data] = useQuery(GET_CAPSULE, {
    variables: { id },
  });

  console.log(data);
  if (loading) return <p>Loading...</p>; // This could be prettier
  if (data && data.getCapsule) {
    // Render your component with the data
  } else if (error) {
    // Handle the error here, e.g., display an error message
    console.error("Error fetching data:", error);
    return <p>Error loading data.</p>;
  }

  
  if (!id) {
    return <p>NO Event Here</p>;
  }




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
