// Attendee Signup Page

//!TODO THIS NEEDS DATABASE SAVE

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AttendeeSignup() {
  const navigate = useNavigate();

  const [attendee, setAttendee] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const { eventId } = useParams();

  useEffect(() => {
    if (name) {
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

  return (
    <main className="min-h-screen bg-main_bg">
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
}
