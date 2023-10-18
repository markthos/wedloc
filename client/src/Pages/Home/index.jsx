// The Home Page

import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
// Animate on Scroll
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  //Sets the duration for all animations (1.5s)
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="flex min-h-screen flex-col justify-center bg-beige">
        <div className="p-5">
          <h2 data-aos="fade-left" className="text-4xl md:text-8xl">
            Your Memories...
          </h2>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center bg-lightgray">
        <div className="p-5">
          <h2 data-aos="fade-right" className="text-right text-4xl md:text-8xl">
            ...Your Journey
          </h2>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center">
        <div className="p-5">
          <h2 data-aos="fade-left" className="text-4xl md:text-8xl">
            Beautifully Preserved
          </h2>
        </div>
      </section>
      <section className="min-h-[50vh] bg-darkgray">
        <h2 data-aos="fade-up" className="text-center text-4xl md:text-8xl">
          Call To Action Here
        </h2>
        <RouterLink to={"/signup"}>
          <StyledButton outlined button>Sign Up Now!</StyledButton>
        </RouterLink>
      </section>
    </div>
  );
}
