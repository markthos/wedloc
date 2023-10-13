// The My Events Page where all the events that user has created will display and can be edited or deleted
// TODO User should be routed to here after logging in
// TODO Add modal for delete and edit (or take you to the event creator page to edit it)
// TODO Improve visual design
// TODO Connect to DB
// TODO If user doesn't have any events, display a message or some kind of ui element/button to create an event


import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StyledButton from "../../components/StyledButton";
import { Link as RouterLink } from "react-router-dom";

export default function MyEvents() {
  //! Remove this after DB is connected, this is just a placeholder
  const data = [
    "Sarah and John’s Wedding",
    "Emma and Ethan's Wedding",
    "Olivia and Liam's Wedding",
    "Ava and Noah's Wedding",
    "Sophia and William's Wedding",
  ];

  //! Needs a modal for this
  const handleDelete = () => {
    alert("Are you sure you want to delete this event?");
  }

  //! Needs a modal for this
  const handleEdit = () => {
    alert("Are you sure you want to edit this event?");
  }

  return (
    <section className="container m-auto flex h-full items-center justify-center p-5">
      <form className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg">
        <h1 className="text-4xl">My Events</h1>
        <div className="flex w-full flex-col items-center gap-4">
          {data.map((event) => (
            <div className="flex w-full items-center justify-between">
              {/* The to needs to be the link to the actual event */}
              <RouterLink to={"/"} className="hover:underline text-xl">{event}</RouterLink>
              <div className="flex gap-4">
                <StyledButton onClick={handleEdit} outlined>
                  <EditIcon />
                </StyledButton>
                <StyledButton onClick={handleDelete} outlined>
                  <DeleteIcon />
                </StyledButton>
              </div>
            </div>
          ))}
        </div>
        <StyledButton primaryColor>
          <RouterLink to={"/eventcreator"}>Create Event</RouterLink>
        </StyledButton>
      </form>
    </section>
  );
}
