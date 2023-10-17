// The My Events Page where all the events that user has created will display and can be edited or deleted
// TODO User should be routed to here after logging in
// TODO Add modal for delete and edit (or take you to the event creator page to edit it)
// TODO Improve visual design
// TODO Connect to DB
// TODO If user doesn't have any events, display a message or some kind of ui element/button to create an event
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import StyledButton from '../../components/StyledButton';
import StyledFormInput from '../../components/StyledFormInput';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Link as RouterLink } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_CAPSULES } from "../../utils/queries";
// import { DELETE_CAPSULE } from "../../utils/mutations";
import { UPDATE_CAPSULE } from "../../utils/mutations";
import { useState, useEffect, useRef } from "react";



export default function MyEvents() {
  const { loading, data, error } = useQuery(GET_MY_CAPSULES);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [updateCapsule] = useMutation(UPDATE_CAPSULE);
  const [formState, setFormState] = useState({title: '', location: '', eventPic: ''});

  const [dataURL, setDataURL] = useState(""); //! THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // using this to display the image on the page
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  
  const openCloudinaryWidget = (event) => {
    event.preventDefault();
    widgetRef.current.open();
 }

  const handleEdit = (capsule) => {
    setSelectedCapsule(capsule);
    setIsModalOpen(true);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // not even sure this was the best way to do this but here we are..

    const variables = {
      ...formState,
      eventPic: dataURL,
      capsuleId: selectedCapsule._id
    };

    if (formState.title === "") {
      formState.title = selectedCapsule.title;
    }
    if (formState.location === "") {
      formState.location = selectedCapsule.location;
    }

    const { data } = await updateCapsule({
      variables: variables
    });

    setFormState({
      title: '',
      location: '',
      eventPic: '',
    });
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        folder: saveFolder,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setDataURL(result.info.url);
           setUploadedPhoto(result.info.url); 
        }
      },
    );
  }, [saveFolder]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const capsules = data.getUserCapsules;

  // IMPLEMENT PHOTO DISPLAY


  return (
    <section className="container m-auto flex h-full items-center justify-center p-5">
         <form
            className={`flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg ${
              isModalOpen ? 'hidden' : ''
            }`}
          >
        <h1 className="text-4xl">My Events</h1>
        <div className="flex w-full flex-col items-center gap-4">
          {capsules.length === 0 ? (
            <p>No events found. Create an event to get started.</p>
          ) : (
            capsules.map((capsule) => (
              <div className="flex w-full items-center justify-between" key={capsule._id}>
                <RouterLink to={`/event/${capsule._id}`} className="hover:underline text-xl">
                  {capsule.title}
                </RouterLink>
                <div className="flex gap-4">
                <StyledButton onClick={(e) => {
                  e.preventDefault();
                  handleEdit(capsule);
                }} outlined>
                  <EditIcon />
                </StyledButton>
                  {/* <StyledButton onClick={() => handleDelete(capsule)} outlined>
                    <DeleteIcon />
                  </StyledButton> */}
                </div>
              </div>
            ))
          )}
        </div>
        <StyledButton primaryColor>
          <RouterLink to={"/eventcreator"}>Create Event</RouterLink>
        </StyledButton>
      </form>

      {/* edit modal */}
      {isModalOpen && (
        <section className="flex flex-row justify-center items-center min-h-full w-screen">
        <div className='mb-5 flex flex-col items-center rounded-md bg-beige shadow-lg w-screen md:w-1/2'>
          <h1 className="font-sans text-2xl text-center font-medium mt-6 md:text-3xl">Editing {selectedCapsule.title}</h1>
          <div className='flex flex-col items-center w-full'>
            <form onSubmit={handleFormSubmit} className="flex flex-col items-center w-full">
              <div className="bg-lightgray rounded-full w-32 h-32 flex items-center justify-center">
                {
                  uploadedPhoto ? 
                  <img src={uploadedPhoto} alt="Uploaded event" className="w-32 h-32 rounded-full" /> :
                  selectedCapsule.eventPic ?
                  <img src={selectedCapsule.eventPic} alt="Uploaded event" className="w-32 h-32 rounded-full" /> :
                  <CameraAltOutlinedIcon fontSize="large" className="w-32 h-32 rounded-full" />
              }
              </div>
              <StyledButton type="button" onClick={openCloudinaryWidget} outlined>
              <AddAPhotoIcon className="mr-4" />
                Upload Picture
              </StyledButton>
    
              <StyledFormInput 
                fullWidthStyle
                type="text"
                name="title"
                placeholder={selectedCapsule.title}
                default={selectedCapsule.title}
                onChange={handleChange}
                value={formState.title}
              />
              <StyledFormInput 
                fullWidthStyle
                type="text"
                name="location"
                placeholder={selectedCapsule.location}
                default={selectedCapsule.location}
                onChange={handleChange}
                value={formState.location}
              />
              {/* <StyledFormInput 
                fullWidthStyle
                type="date"
                name="date"
                onChange={handleChange}
                value={formState.date}
              /> */}
              <StyledButton type="submit" primaryColor>
                 Edit Event
              </StyledButton>
            </form>
          </div>
        </div>
      </section>
      )}
    </section>
  );
}
