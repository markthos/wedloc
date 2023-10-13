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
      <main className="bg-main_bg min-h-screen">
        <section className="bg-beige grid container mx-auto px-auto w-1/2 rounded-tl-xl rounded-br-xl">
          <div className="my-10 space-xy-3">
            <h1 className="font-sans text-xl text-center font-medium w-auto px-20 md:text-3xl">Event Creator</h1>
          </div>
          <div className='ml-10'>
          <div className="bg-lightgray rounded-full w-32 ml-8">
            <CameraAltOutlinedIcon fontSize="large" className="w-32 m-12" />
          </div>
          <p className='text-center md:text-left'>
            Upload your event photo
          </p>
          </div>
          <div className="">
            <form className="px-24 space-y-4 space-x-auto"
              onSubmit={handleFormSubmit}>
              <StyledFormInput 
                type="text"
                name="title"
                placeholder={'Event Name'}
                onChange={handleChange}
                value={formState.title}
                required={require}

              />
              <StyledFormInput 
                type="text"
                name="location"
                placeholder={'City, State'}
                onChange={handleChange}
                value={formState.location}
                required={require}

              />
              <StyledFormInput 
                type="date"
                name="date"
                placeholder={'Event Date'}
                onChange={handleChange}
                value={formState.date}
                required={require}
              />
              <StyledButton
                submit
                primaryColor
                displayText={"Create Event"}
              />
          </form>
        </div>
        </section>
      </main>
    );
}