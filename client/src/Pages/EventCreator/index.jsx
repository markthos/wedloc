// The Event Creator page where the event is first made
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

// GQL mutation
import { useMutation } from "@apollo/client";
import { ADD_CAPSULE } from "../../utils/mutations";

// For creating new events
export default function EventCreator() {
  //data to save into the DB
  const [formState, setFormState] = useState({
    title: "",
    location: "",
    date: "",
    eventPic: "",
  });
  const [dataURL, setDataURL] = useState(""); // THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // using this to display the image on the page
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;
  const navigate = useNavigate();

  // Default image if no image is uploaded
  const defaultImgUrl =
    "https://res.cloudinary.com/dp0h5vpsz/image/upload/v1697055967/wedloc/test/n4nxmtrfe3forwcjsyzr.png";

    // GQL mutation for adding the new event capsule
  const [addCapsule, { error, data }] = useMutation(ADD_CAPSULE);

  // handling the form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Open the widget without submitting the form
  const openCloudinaryWidget = (event) => {
    event.preventDefault();
    widgetRef.current.open();
  };

  // handle submitting the form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try to add the new capsule with graph ql
    try {
      const { data } = await addCapsule({
        variables: { ...formState, eventPic: dataURL || defaultImgUrl }, // use the default image if no image is uploaded
      });
      if (data && data.createCapsule && data.createCapsule._id) {
        navigate(`/eventspace/${data.createCapsule._id}`);
      } else {
        throw new Error("something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }

    // reset the form
    setFormState({
      title: "",
      location: "",
      date: "",
      eventPic: "",
    });
  };

  // This is the useEffect for the image upload widget
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
          setDataURL(result.info.secure_url);
          setUploadedPhoto(result.info.secure_url);
        }
      },
    );
  }, [saveFolder]);

  return (
    <section className="container m-auto flex h-full flex-col items-center justify-center p-5">
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg "
      >
        <h1 className="text-4xl">Create an Event</h1>
        <div className="text-center">
          <div className="mb-5">
            {uploadedPhoto ? (
              <img
                src={uploadedPhoto}
                alt="Uploaded event"
                className="h-80 w-80 rounded-full object-cover shadow-lg"
              />
            ) : (
              <img
                src={defaultImgUrl}
                alt="Default"
                className="h-80 w-80 rounded-full object-cover shadow-lg"
              />
            )}
          </div>
          <StyledButton type="button" onClick={openCloudinaryWidget} outlined>
            <AddAPhotoIcon className="mr-4" />
            Upload Picture
          </StyledButton>
        </div>
        <div className="flex w-full flex-col md:w-2/3">
          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label>Event</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"title"}
                onChange={handleChange}
                value={formState.title}
                placeholder={"Event Title"}
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label>Location</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"location"}
                onChange={handleChange}
                value={formState.location}
                placeholder={"City, State"}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label>Date</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"date"}
                name={"date"}
                onChange={handleChange}
                value={formState.date}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <StyledButton submit primaryColor>
              Create Event
            </StyledButton>
          </div>
        </div>
      </form>
    </section>
  );
}
