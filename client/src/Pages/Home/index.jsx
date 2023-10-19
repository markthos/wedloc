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
        className="flex min-h-screen flex-col justify-center bg-beige bg-cover bg-center bg-no-repeat p-10 text-white"
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
          className="self-end bg-black bg-opacity-70 p-4 text-4xl font-bold md:text-8xl my-32"
        >
          Your Journey,
        </h2>
        <h2
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="600"
          data-aos-offset="0"
          className="w-max self-center bg-black bg-opacity-70 py-4 px-12 font-logo text-4xl md:text-9xl"
        >
          Beautifully Preserved
        </h2>
        {/* TODO: ADD SOMETHING HERE TO INDICATE SCROLLING DOWN */}
      </section>
      {/* APP FEATURES SECTION 1: CREATE EVENTS, DISPALY PHOTOS AND VIDEO, ALLOW COMMENTS, LIVE CHAT AVAILABLE */}
      <section className="flex min-h-screen flex-col justify-center bg-lightgray">
        <div className="p-5"></div>
      </section>
      {/* APP FEATURE SECTION 2: Seamless Guest Experience: Share the joy without any barriers. */}
      <section className="flex min-h-screen flex-col justify-center">
        <div className="p-5"></div>
      </section>
      {/* APP FEATURE SECTION 3: Effortless Entry: No typing, just scan, and you're in */}
      <section className="flex min-h-screen flex-col justify-center">
        <div className="p-5"></div>
      </section>
      {/* CALL TO ACTION SECTION */}
      <section className="border-b-2 bg-black py-20 text-white">
        <h2
          data-aos="fade-left"
          data-aos-once="true"
          className="mb-20 px-20 text-4xl font-bold md:text-6xl"
        >
          WedLoc is the priemere wedding photgrapher's social networking site.
        </h2>
        <h2
          data-aos="fade-right"
          data-aos-once="true"
          className="mb-10 text-center md:text-5xl"
        >
          Make every moment count and preserve it forever!
        </h2>
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
