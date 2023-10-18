import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import { Link as RouterLink } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_CAPSULES } from "../../utils/queries";
import { DELETE_CAPSULE } from "../../utils/mutations";
import { UPDATE_CAPSULE } from "../../utils/mutations";
import { useState, useEffect, useRef } from "react";

export default function MyEvents() {
  const { loading, data, error } = useQuery(GET_MY_CAPSULES);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  // THIS IS EDIT MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateCapsule] = useMutation(UPDATE_CAPSULE);
  const [deleteCapsule] = useMutation(DELETE_CAPSULE);
  const [formState, setFormState] = useState({
    title: "",
    location: "",
    eventPic: "",
  });

  const [dataURL, setDataURL] = useState(""); // THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
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
  };

  const handleEdit = (capsule) => {
    setSelectedCapsule(capsule);
    setIsModalOpen(true);
  };

  const openDeleteModal = (capsule) => {
    setSelectedCapsule(capsule);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCapsule(null);
  };

  const handleDelete = async () => {
    if (selectedCapsule) {
      // call the delete mutation here
      await deleteCapsule({ variables: { capsuleId: selectedCapsule._id } });
      closeDeleteModal();
      return;
    }
  };

  const handleDeleteModal = (capsule) => {
    setSelectedCapsule(capsule);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // not even sure this was the best way to do this but here we are..
    if (formState.title === "") {
      formState.title = selectedCapsule.title;
    }
    if (formState.location === "") {
      formState.location = selectedCapsule.location;
    }

    const variables = {
      ...formState,
      eventPic: dataURL,
      capsuleId: selectedCapsule._id,
    };

    const { data } = await updateCapsule({
      variables: variables,
    });

    setFormState({
      title: "",
      location: "",
      eventPic: "",
    });
    setIsModalOpen(false);
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
          isModalOpen ? "hidden" : ""
        }`}
      >
        <h1 className="text-4xl">My Events</h1>
        <div className="flex w-full flex-col items-center gap-4">
          {capsules.length === 0 ? (
            <p>No events found. Create an event to get started.</p>
          ) : (
            capsules.map((capsule) => (
              <div
                className="flex w-full items-center justify-between"
                key={capsule._id}
              >
                <div className="flex justify-items-center content-center text-align">
                  {capsule.eventPic && (
                    <img
                      src={capsule.eventPic}
                      alt="Uploaded event"
                      className="h-20 w-20 rounded-full self-center"
                    />
                  )}
                  <RouterLink
                    to={`/eventspace/${capsule._id}`}
                    className="text-xl hover:underline self-center ml-3"
                  >
                    {capsule.title}
                  </RouterLink>
                </div>
                <div className="flex gap-4">
                  <StyledButton outlined>
                    <RouterLink to={`/eventspace/${capsule._id}/qrcode`} lazy>
                      <QrCode2Icon />
                    </RouterLink>
                  </StyledButton>
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(capsule);
                    }}
                    outlined
                  >
                    <EditIcon />
                  </StyledButton>
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      openDeleteModal(capsule);
                    }}
                    outlined
                  >
                    <DeleteIcon />
                  </StyledButton>
                </div>
              </div>
            ))
          )}
        </div>
        <StyledButton primaryColor>
          <RouterLink to={"/eventcreator"}>Create Event</RouterLink>
        </StyledButton>
      </form>

      {/* delete modal */}

      {isDeleteModalOpen && (
        <div className="flex min-h-full w-screen flex-row items-center justify-center">
          <div className="flex w-screen flex-col items-center rounded-md bg-beige shadow-lg md:w-1/2">
            <h2 className="mt-6 text-center font-sans text-xl font-medium md:text-2xl">
              Are you sure you want to delete {selectedCapsule.title}?
            </h2>
            <div className="mb-6 mt-4 flex gap-4">
              <StyledButton onClick={handleDelete} primaryColor>
                Confirm
              </StyledButton>
              <StyledButton onClick={closeDeleteModal} outlined>
                Cancel
              </StyledButton>
            </div>
          </div>
        </div>
      )}

      {/* edit modal */}
      {isModalOpen && (
        <section className="flex min-h-full w-screen flex-row items-center justify-center">
          <div className="mb-5 flex w-screen flex-col items-center rounded-md bg-beige shadow-lg md:w-1/2">
            <h1 className="mt-6 text-center font-sans text-2xl font-medium md:text-3xl">
              Editing {selectedCapsule.title}
            </h1>
            <div className="flex w-full flex-col items-center">
              <form
                onSubmit={handleFormSubmit}
                className="flex w-full flex-col items-center"
              >
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-lightgray">
                  {uploadedPhoto ? (
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded event"
                      className="h-32 w-32 rounded-full"
                    />
                  ) : selectedCapsule.eventPic ? (
                    <img
                      src={selectedCapsule.eventPic}
                      alt="Uploaded event"
                      className="h-32 w-32 rounded-full"
                    />
                  ) : (
                    <CameraAltOutlinedIcon
                      fontSize="large"
                      className="h-32 w-32 rounded-full"
                    />
                  )}
                </div>
                <StyledButton
                  type="button"
                  onClick={openCloudinaryWidget}
                  outlined
                >
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
