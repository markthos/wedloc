// The Event Creator page where the event is first made
import StyledButton from '../../components/StyledButton';
import StyledFormInput from '../../components/StyledFormInput';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DefaultProfileImg from "./img/default_profile.png";

import React, { useState, useEffect, useRef} from 'react';

import { useMutation } from '@apollo/client';
import { ADD_CAPSULE } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';



export default function EventCreator() {
  const [formState, setFormState] = useState({title: '', location: '', date: '', eventPic: ''});
  const [dataURL, setDataURL] = useState(""); // THIS dataURL is the image url that is returned from cloudinary to be saved into the DB
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // using this to display the image on the page
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const saveFolder = `wedloc/userimages`;
  const navigate = useNavigate();

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
      }); 
      if (data && data.createCapsule && data.createCapsule._id) {
        navigate(`/eventspace/${data.createCapsule._id}`);
      } else {
        throw new Error('something went wrong!');
      }
      } catch (error) {
        console.error(error);
      }
  
      setFormState({
        title: '',
        location: '',
        date: '',
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

  return (
    
    <section className="container m-auto flex flex-col h-full items-center justify-center p-5">
      
      <form onSubmit={handleFormSubmit} className="flex w-full flex-col items-center gap-4 rounded-md bg-beige p-10 shadow-lg ">
      <h1 className='text-4xl'> CREATE AN EVENT </h1>
        <div className='text-center'>
          <div className="mb-5">
            {
              uploadedPhoto ? 
              <img src={uploadedPhoto} alt="Uploaded event" className="w-80 h-80 rounded-full object-cover shadow-lg" /> :
              <img src={DefaultProfileImg} alt="Default photo" className="w-80 h-80 rounded-full object-cover shadow-lg"/>
            }
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