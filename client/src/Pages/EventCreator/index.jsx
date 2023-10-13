// The Event Creator page where the event is first made
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import StyledButton from '../../components/StyledButton';
import StyledFormInput from '../../components/StyledFormInput';


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAPSULE } from '../../utils/mutations';
import Auth from '../../utils/auth'




export default function EventCreator() {

  const [formState, setFormState] = useState({title: '', location: '', date: ''});
  const [addCapsule, { error, data}] = useMutation(ADD_CAPSULE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addCapsule({
        variables: { ...formState },
      })
      console.log(data)
    } catch (error) {
      console.error(error);
    }

    setFormState({
      title: '',
      location: '',
      date: '',
    })
  };

  return (
    
    <section className="flex flex-row justify-center items-center min-h-full w-screen">
      <div className='mb-5 flex flex-col items-center rounded-md bg-beige shadow-lg w-screen md:w-1/2'>
        <h1 className="font-sans text-2xl text-center font-medium mt-6 md:text-3xl">Event Creator</h1>
        <div className='flex flex-col items-center w-full'>
          <div className=''>
            <div className="bg-lightgray rounded-full w-32">
              <CameraAltOutlinedIcon fontSize="large" className="w-32 m-12" />
            </div>
            </div>
            <p className='m-4'>
                Upload your event photo
              </p>
          <div className="w-full">
            <form className="flex flex-col">
              <StyledFormInput 
                fullWidthStyle
                type="text"
                name="event"
                placeholder={'Event Name'}
                value={formState.username}
                required
              />
              <StyledFormInput 
                fullWidthStyle
                type="text"
                name="location"
                placeholder={'City, State'}
                required
              />
              <StyledFormInput 
                fullWidthStyle
                type="date"
                name="date"
                placeholder={'Event Date'}
                required
              />
              <StyledButton submit primaryColor>
                Create Event
              </StyledButton>
            </form>
          </div>
        </div>
      </div>
    </section>
   
  );
}