import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

const AttendeeSignup = () => {
  const [attendee, setAttendee] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const { eventId } = useParams();

  useEffect(() => {
    if (name) {
      // If a name exists in local storage, navigate to eventspace
      return <Navigate to={`/eventspace/${eventId}`} />;
    }
  }, [name, eventId]);

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
    <div>
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
    </div>
  );
};

export default AttendeeSignup;
