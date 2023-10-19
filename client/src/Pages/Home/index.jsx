// The Home Page

import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
// Animate on Scroll
import Aos from "aos";
import "aos/dist/aos.css";
import HeroSectionBG from "./assets/img/homeHeroSecBG.jpg";

export default function Home() {
  //Sets the duration for all animations (1.5s)
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="flex min-h-screen flex-col justify-center bg-black bg-cover bg-center bg-no-repeat p-10 text-white"
        style={{ backgroundImage: `url(${HeroSectionBG})` }}
      >
        <h2
          data-aos="fade-left"
          data-aos-once="true"
          className="w-max bg-black bg-opacity-70 p-4 text-4xl font-bold md:text-8xl"
        >
          Your Memories,
        </h2>
        <h2
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="300"
          data-aos-offset="0"
          className="my-44 self-end bg-black bg-opacity-70 p-4 text-4xl font-bold md:text-8xl"
        >
          Your Journey,
        </h2>
        <h2
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="600"
          data-aos-offset="0"
          className="w-max self-center bg-black bg-opacity-70 p-4 text-4xl font-bold md:text-8xl"
        >
          Beautifully Preserved
        </h2>
        {/* TODO: ADD SOMETHING HERE TO INDICATE SCROLLING DOWN */}
      </section>
      {/* App Features Section: Create Unique Events */}
      <section className="flex min-h-[50vh] flex-col items-center justify-around bg-darkgray text-white">
        <h2
          data-aos="fade-down"
          data-aos-once="true"
          className="text-6xl font-bold"
        >
          Create Unique Events
        </h2>
        <h3
          data-aos="fade-up"
          data-aos-once="true"
          className="text-4xl font-bold"
        >
          Share your work and allow attendees to interact with it
        </h3>
      </section>
      {/* App Features Section: Interactivity */}
      <section className="flex flex-col">
        <div className="flex min-h-[50vh] flex-col md:flex-row">
          <div
            data-aos="slide-right"
            data-aos-once="true"
            className="flex flex-col justify-center gap-20 p-10 md:w-5/12"
          >
            <h2 className="self-center text-5xl font-bold">
              Interactive Events
            </h2>
            <h3 className="text-right text-4xl">
              Attendees can comment and up vote on your work...
            </h3>
          </div>
          <div
            data-aos="slide-left"
            data-aos-once="true"
            className="bg-black md:w-7/12"
          >
            PICTURE HERE
          </div>
        </div>
        <div className="flex min-h-[50vh] flex-col md:flex-row">
          <div
            data-aos="slide-right"
            data-aos-once="true"
            className="bg-black md:w-7/12"
          >
            PICTURE
          </div>
          <div
            data-aos="slide-left"
            data-aos-once="true"
            className="flex flex-col justify-center p-10 md:w-5/12"
          >
            <h3 className="text-4xl">
              ..and chat with each other with Live Chat during the event!
            </h3>
          </div>
        </div>
      </section>
      {/* App Features Section: Ease of Use, Guest Experience */}
      <section className="flex min-h-[50vh] flex-col md:flex-row">
        <div
          data-aos="flip-left"
          data-aos-once="true"
          className="flex flex-col items-center justify-around bg-beige px-5 text-center md:w-1/2"
        >
          <h2 className="text-5xl font-bold">Seamless Guest Experience</h2>
          <h3 className="text-4xl ">
            Share the joy without any barriers, no account required for guests.
          </h3>
          <RouterLink
            to={"/eventspace/652fe323e7c20a3d1740fc6f/attendeesignup"}
          >
            <StyledButton outlined button>
              Try it out
            </StyledButton>
          </RouterLink>
        </div>
        <div
          data-aos="flip-right"
          data-aos-once="true"
          className="flex flex-col items-center justify-around bg-lightgray px-5 text-center md:w-1/2"
        >
          <h2 className="text-5xl font-bold">Effortless Entry</h2>
          <h3 className="text-4xl">
            No typing, just scan, and you're in with unique QR codes for every
            event!
          </h3>
          <RouterLink to={"/eventspace/652fe323e7c20a3d1740fc6f/qrcode"}>
            <StyledButton outlined button>
              Check It Out
            </StyledButton>
          </RouterLink>
        </div>
      </section>
      {/* Reservation Payment Section */}
      <section className="flex flex-col gap-5 bg-white py-24 md:flex-row md:items-start">
        <h2
          data-aos="fade-right"
          data-aos-once="true"
          className="mb-5  px-10 text-4xl font-bold md:w-2/6 md:text-6xl"
        >
          Quick and Secure Reservations
        </h2>
        <div data-aos="fade-left" data-aos-once="true" className="md:w-4/6">
          <h3 className="mb-5 pr-5 md:text-4xl">
            Your potential clients can easily reserve your services with our
            effortless payments system.
          </h3>

          <RouterLink to={"/payment"}>
            <StyledButton primaryColor button>
              Learn More
            </StyledButton>
          </RouterLink>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="border-b-4 border-t-4 border-gold bg-black py-20 text-white">
        <h2
          data-aos="fade-left"
          data-aos-once="true"
          className="mb-20 px-20 text-4xl font-bold md:text-6xl"
        >
          WedLoc is the priemere wedding photgrapher's social networking site.
        </h2>
        <h3
          data-aos="fade-right"
          data-aos-once="true"
          className="mb-10 text-center md:text-5xl"
        >
          Make every moment count and preserve it forever!
        </h3>
        <div
          data-aos="flip-down"
          data-aos-once="true"
          className="flex justify-center"
        >
          <RouterLink to={"/signup"}>
            <StyledButton secondaryColor button>
              Sign Up Now!
            </StyledButton>
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
