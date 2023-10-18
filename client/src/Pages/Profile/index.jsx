import React, { useState, useEffect, useRef } from "react";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { GET_USER } from "../../utils/queries";

export default function Profile() {
  const { loading, data, error } = useQuery(GET_USER);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePic: "",
  });
  //* info for the image upload
  const [dataURL, setDataURL] = useState(""); //! THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // using this to display the image on the page
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;
  const navigate = useNavigate();

  const [updateUser] = useMutation(UPDATE_USER);

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

 const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const { data } = await updateUser({
      variables: { ...formState, profilePic:dataURL },
    });
      if (data && data.updateUser) {
        navigate(`/myevents`);
      } else {
        throw new Error('something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }

    setFormState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      profilePic: "",
    });
  };

  //* This is the useEffect for the image upload
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
          setDataURL(result.info.url);
          setUploadedPhoto(result.info.url);
        }
      },
    );

    // Set formState to the current user's info
    // Set formState with user data if available
    if (data && data.me) {
      const { firstName, lastName, username, email, profilePic } = data.me;
      setFormState({
        firstName: firstName || '',
        lastName: lastName || '',
        username: username || '',
        email: email || '',
        profilePic: profilePic || '',
      });
    }
  }, [data, saveFolder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const User = data.me;

  return (
    <section className="container m-auto flex h-full items-center justify-center p-5">
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg md:flex-row"
      >
        {/* 1 col in mobile, 2 columns above the md breakpoint (profile image col is 1/3 width, inputs col is 2/3 width) */}
        <div className="w-full text-center md:w-1/3">
          <div className="m-auto mb-5 h-80 w-80 rounded-full object-cover shadow-lg">
            {uploadedPhoto ? (
              <img
                src={uploadedPhoto}
                alt="Uploaded event"
                className="h-80 w-80 rounded-full object-cover shadow-lg"
              />
            ) : (
              <img
                src={User.profilePic}
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
        {/* 1 col in mobile, 2 cols above the md breakpoint (label column is 1/4 width, input is 3/4 width) */}
        <div className="flex w-full flex-col md:w-2/3">
          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"firstName"}
                onChange={handleChange}
                placeholder={User.firstName}
                value={formState.firstName}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"lastName"}
                onChange={handleChange}
                placeholder={User.lastName}
                value={formState.lastName}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="username">Username</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"text"}
                name={"username"}
                onChange={handleChange}
                placeholder={User.username}
                value={formState.username}
              />
            </div>
          </div>

          <div className="flex flex-col items-baseline md:flex-row md:gap-4">
            <div className="w-full md:w-1/6 md:text-right">
              <label htmlFor="email">Email</label>
            </div>
            <div className="w-full md:w-5/6">
              <StyledFormInput
                fullWidthStyle
                type={"email"}
                name={"email"}
                onChange={handleChange}
                placeholder={User.email}
                value={formState.email}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <StyledButton submit primaryColor>
              Save Changes
            </StyledButton>
          </div>
        </div>
      </form>
    </section>
  );
}
