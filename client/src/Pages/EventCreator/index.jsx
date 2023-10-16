// The Event Creator page where the event is first made
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import StyledButton from '../../components/StyledButton';
import StyledFormInput from '../../components/StyledFormInput';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import React, { useState, useEffect, useRef} from 'react';

import { useMutation } from '@apollo/client';
import { ADD_CAPSULE } from '../../utils/mutations';



export default function EventCreator() {
  const [formState, setFormState] = useState({title: '', location: '', date: '', eventPic: ''});
  const [dataURL, setDataURL] = useState(""); //! THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // using this to display the image on the page
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;

  const [addCapsule, { error, data}] = useMutation(ADD_CAPSULE);

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
 }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = await addCapsule({
        variables: { ...formState, eventPic:dataURL },
      })
      console.log(data)
    } catch (error) {
      console.error(error);
    }

    setFormState({
      title: '',
      location: '',
      date: '',
      eventPic: '',
    })
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

  return (
    
  <section className="flex flex-row justify-center items-center min-h-full w-screen">
    <div className='mb-5 flex flex-col items-center rounded-md bg-beige shadow-lg w-screen md:w-1/2'>
      <h1 className="font-sans text-2xl text-center font-medium mt-6 md:text-3xl">Event Creator</h1>
      <div className='flex flex-col items-center w-full'>
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center w-full">
          <div className="bg-lightgray rounded-full w-32 h-32 flex items-center justify-center">
            {
              uploadedPhoto ? 
              <img src={uploadedPhoto} alt="Uploaded event" className="w-24 h-24" /> :
              <CameraAltOutlinedIcon fontSize="large" className="w-24 h-24" />
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
            placeholder={'Event Name'}
            onChange={handleChange}
            value={formState.title}
            required={require}
          />
          <StyledFormInput 
            fullWidthStyle
            type="text"
            name="location"
            placeholder={'City, State'}
            onChange={handleChange}
            value={formState.location}
            required={require}
          />
          <StyledFormInput 
            fullWidthStyle
            type="date"
            name="date"
            placeholder={'Event Date'}
            onChange={handleChange}
            value={formState.date}
            required={require}
          />
          <StyledButton type="submit" primaryColor>
             Create Event
          </StyledButton>
        </form>
      </div>
    </div>
  </section>
  );
}