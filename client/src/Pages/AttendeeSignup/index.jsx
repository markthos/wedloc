// Attendee Signup Page
// TODO: Add save to database functionality
// TODO: Make this look nicer, add a background image, icons, etc.


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";

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
    localStorage.setItem("name", attendee);
    setName(attendee);
  };

  const handleInputChange = (e) => {
    setAttendee(e.target.value);
  };

  return (
    <section className="container m-auto flex h-full items-center justify-center p-5">
      <form
        className="flex w-full flex-col items-center rounded-md bg-beige p-10 shadow-lg md:w-1/2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstName" className="mb-5 text-xl">
          What is your Name?
        </label>
        <StyledFormInput
          fullWidthStyle
          onChange={handleInputChange}
          type={"text"}
          name={"firstName"}
          placeholder={"First Name"}
          value={attendee}
        />
        <StyledButton primaryColor submit>
          Submit
        </StyledButton>
      </form>
    </section>
  );
}
