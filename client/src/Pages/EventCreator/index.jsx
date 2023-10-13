// The Event Creator page where the event is first made
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import StyledButton from '../../components/StyledButton';
import StyledFormInput from '../../components/StyledFormInput';

export default function EventCreator() {
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
            <form className="px-24 space-y-4 space-x-auto">
              <StyledFormInput 
                type="text"
                name="event"
                placeholder={'Event Name'}
                required={require}

              />
              <StyledFormInput 
                type="text"
                name="location"
                placeholder={'City, State'}
                required={require}

              />
              <StyledFormInput 
                type="date"
                name="date"
                placeholder={'Event Date'}
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