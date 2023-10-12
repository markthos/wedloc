// Attendee Signup Page

//!TODO THIS NEEDS DATABASE SAVE

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function AttendeeSignup() {
  const navigate = useNavigate();
  const { from } = useLocation();

  const [attendee, setAttendee] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const { eventId } = useParams();

  console.log("from: " + from);

  useEffect(() => {
    if (name) {
      // If a name exists in local storage, navigate to eventspace
      navigate(`/eventspace/${eventId}`);
    }
  }, [name, eventId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(attendee);
    localStorage.setItem("name", attendee);
    setName(attendee);
  };

  const handleInputChange = (e) => {
    setAttendee(e.target.value);
  };

  if (name) {
    return <Navigate to={`/eventspace/${eventId}`} />;
  }

  return (
    <main className="bg-main_bg min-h-screen">
      <section className="container m-auto">
        <h1>What's Your name?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={attendee}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};
