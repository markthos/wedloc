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
  const [formChanged, setFormChanged] = useState(false); // used to determine if the user has changed any of the form inputs
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

    setFormChanged(true);
  };

  // Open the widget without submitting the form
  const openCloudinaryWidget = (event) => {
    event.preventDefault();
    widgetRef.current.open();

    // Set formChanged to true when a photo is uploaded
    setFormChanged(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: { ...formState, profilePic: dataURL },
      });
      if (data && data.updateUser) {
        navigate(`/myevents`);
      } else {
        throw new Error("something went wrong!");
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
          setDataURL(result.info.secure_url);
          setUploadedPhoto(result.info.secure_url);
        }
      },
    );

    // Set formState to the current user's info
    // Set formState with user data if available
    if (data && data.me) {
      const { firstName, lastName, username, email, profilePic } = data.me;
      setFormState({
        firstName: firstName || "",
        lastName: lastName || "",
        username: username || "",
        email: email || "",
        profilePic: profilePic || "",
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
        className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg"
      >
        <h1 className="mb-4 text-center text-4xl">My Profile</h1>
        {/* Contains the profile image section and user info form section, 
        that's how it can be vertical in mobile and horizontal in wider viewports */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center md:w-1/3">
            <div className="m-auto mb-5 h-auto max-w-full rounded-full object-cover shadow-lg">
              {uploadedPhoto ? (
                <img
                  src={uploadedPhoto}
                  alt="Uploaded event"
                  className="h-auto max-w-full rounded-full object-cover shadow-lg"
                />
              ) : (
                <img
                  src={User.profilePic}
                  alt="Default"
                  className="h-auto max-w-full rounded-full object-cover shadow-lg"
                />
              )}
            </div>
            <StyledButton type="button" onClick={openCloudinaryWidget} outlined>
              <AddAPhotoIcon className="mr-4" />
              Upload Picture
            </StyledButton>
          </div>
          {/* User Info Section */}
          <div className="flex w-full flex-col justify-center md:w-2/3">
            <div className="flex flex-col items-start md:flex-row md:gap-4">
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
            <div className="flex flex-col items-start md:flex-row md:gap-4">
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
            <div className="flex flex-col items-start md:flex-row md:gap-4">
              <div className="w-full md:w-1/6 md:text-right">
                <label htmlFor="username">User Name</label>
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
            <div className="flex flex-col items-start md:flex-row md:gap-4">
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
            {/* Save changes button only appears when a change is made */}
            <div className="flex justify-center">
              {formChanged ? (
                <StyledButton submit primaryColor>
                  Save Changes
                </StyledButton>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
