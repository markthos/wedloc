// The About Us Page to talk about the project, the team, and the tech and design stack used

import { useEffect } from "react";

// Animate on Scroll
import Aos from "aos";
import "aos/dist/aos.css";

// Text Data
import aboutUsData from "./assets/data/aboutUsData.json";
// Team Images
import arun from "./assets/img/arun.jpg";
import avery from "./assets/img/avery.jpg";
import edward from "./assets/img/edward.png";
import jake from "./assets/img/jake.jpg";
import mark from "./assets/img/mark.jpg";
import will from "./assets/img/will.jpg";
// Logos
import githublogo from "./assets/img/logos/github_square_logo.svg";
import linkedinlogo from "./assets/img/logos/linkedin_rect_logo.svg";
import pflogo from "./assets/img/logos/pf_logo.svg";
import apolloGraphQLLogo from "./assets/img/logos/apollo_graphql_logo.svg";
import expressJSLogo from "./assets/img/logos/expressjs_logo.svg";
import graphqlLogo from "./assets/img/logos/graphql_logo.svg";
import materialUILogo from "./assets/img/logos/materialui_logo.svg";
import tailwindCSSLogo from "./assets/img/logos/tailwindcss_logo.svg";
import axiosLogo from "./assets/img/logos/axios_logo.svg";
import figmaLogo from "./assets/img/logos/figma_logo.svg";
import herokuLogo from "./assets/img/logos/heroku_logo.svg";
import mongodbLogo from "./assets/img/logos/mongodb_logo.svg";
import reactRouterLogo from "./assets/img/logos/react_router_logo.svg";
import cloudinaryLogo from "./assets/img/logos/cloudinary_logo.svg";
import githubLogo from "./assets/img/logos/github_logo.svg";
import jwtLogo from "./assets/img/logos/jwt_logo.svg";
import mongooseLogo from "./assets/img/logos/mongoose_logo.svg";
import reactJSLogo from "./assets/img/logos/reactjs_logo.svg";
import createReactAppLogo from "./assets/img/logos/create_react_app_logo.svg";
import nodeJSLogo from "./assets/img/logos/nodejs_logo.svg";
import stripeLogo from "./assets/img/logos/stripe_logo.svg";
// Development Images
import ideasPhase from "./assets/img/ideas_phase.png";
import preDevPhase from "./assets/img/predevelopment_phase.png";

const teamPics = [arun, avery, edward, jake, mark, will];
const socialLinkLogos = [linkedinlogo, githublogo, pflogo];
const techStackLogos = [
  { src: apolloGraphQLLogo, alt: "Apollo GraphQL Logo" },
  { src: expressJSLogo, alt: "Express.js Logo" },
  { src: graphqlLogo, alt: "GraphQL Logo" },
  { src: materialUILogo, alt: "Material-UI Logo" },
  { src: tailwindCSSLogo, alt: "Tailwind CSS Logo" },
  { src: axiosLogo, alt: "Axios Logo" },
  { src: figmaLogo, alt: "Figma Logo" },
  { src: herokuLogo, alt: "Heroku Logo" },
  { src: mongodbLogo, alt: "MongoDB Logo" },
  { src: reactRouterLogo, alt: "React Router Logo" },
  { src: cloudinaryLogo, alt: "Cloudinary Logo" },
  { src: githubLogo, alt: "GitHub Logo" },
  { src: jwtLogo, alt: "JWT Logo" },
  { src: mongooseLogo, alt: "Mongoose Logo" },
  { src: reactJSLogo, alt: "React.js Logo" },
  { src: createReactAppLogo, alt: "Create React App Logo" },
  { src: nodeJSLogo, alt: "Node.js Logo" },
  { src: stripeLogo, alt: "Stripe Logo" },
];

export default function About() {
  //Sets the duration for all animations (1.5s)
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      {/* About the project section */}
      <section className="container m-auto px-5 pb-20">
        <h1
          data-aos="slide-right"
          className="py-20 text-center text-4xl md:text-left md:text-6xl"
        >
          How we did it...
        </h1>
        <h2 data-aos="fade-in" className="mb-10 mt-10 text-center text-4xl">
          Initial Pitch and Ideas
        </h2>
        <div className="mb-10 flex flex-col gap-10 md:flex-row">
          <img
            data-aos="fade-right"
            className="h-auto w-1/2 rounded-3xl object-cover shadow-2xl"
            src={ideasPhase}
            alt="Ideas Phase Figma"
          />
          <p
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-offset="0"
            className="font-serif text-3xl"
          >
            The inception of our website project stemmed from a recognition of
            the need for a specialized social networking platform tailored for
            wedding photographers and videographers. The idea was to create a
            platform where professionals could effortlessly organize and
            showcase wedding media, allowing couples and their guests to relive
            those precious moments. The concept evolved to include features like
            individual media comments and a real-time chat for event interaction
            without the need for attendees to create an account to use those
            features.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-full md:w-1/3">
            <h2 data-aos="fade-right" className="mb-10 text-3xl">
              Pre-Development
            </h2>
            <p data-aos="fade-right" className="mb-10 font-serif text-3xl">
              Before diving into development, we meticulously pre-visualized the
              website's user experience and functionality. We used Figma to
              create the wireframes and mockups for the site. This allowed us to
              quickly iterate on the design and functionality of the site before
              and during development.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-offset="0"
              className="mb-10 text-3xl"
            >
              Development
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-offset="0"
              className="mb-10 font-serif text-3xl"
            >
              The development phase was characterized by a dedicated team of
              developers collaborating to bring the project to life. We utilized
              modern web technologies and frameworks like React, MongoDB,
              GraphQL, TailwindCSS, MaterialUI, and many others to build a
              robust and responsive web application.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-offset="0"
              className="mb-10 text-3xl"
            >
              Continuous Deployment
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-offset="0"
              className="mb-10 font-serif text-3xl"
            >
              To ensure we didn't have any major bugs or issues, we deployed our
              site on a regular basis starting halfway through the projects
              development up until the final deployment. This allowed us to
              catch any issues early on and fix them before they became a major
              problem.
            </p>
          </div>
        </div>
        <img
          className="mb-10 h-auto w-full rounded-3xl object-cover shadow-2xl"
          src={preDevPhase}
          alt="Figma Mockup of Site"
        />
        <h2 data-aos="fade-up" className="mb-10 text-center text-3xl">
          Future Development
        </h2>
        <p data-aos="fade-up" className="font-serif text-3xl">
          Looking ahead, we are committed to continuous improvement and
          expansion of our platform. Future developments may include enhanced
          event management features, mobile apps for seamless access, and
          further integration of social engagement tools. We aim to stay at the
          forefront of technology and user needs in the field of event-specific
          media sharing and interaction.
        </p>
      </section>
      {/* About the team section */}
      <section className="bg-beige px-5 pb-10">
        <h2 className="py-20 text-center text-4xl md:text-6xl">
          Meet the Team
        </h2>
        {aboutUsData.team.map((member, teamIndex) => (
          <div
            className="container m-auto flex flex-col gap-8 py-10 md:flex-row"
            key={teamIndex}
          >
            <div className="flex flex-col md:w-1/2">
              <img
                data-aos="fade-right"
                className="w-full rounded-2xl shadow-2xl"
                src={teamPics[teamIndex]}
                alt={member.name + " Profile pic"}
              />
            </div>
            <div data-aos="fade-left" className="md:w-1/2">
              <h3 className="mb-4 text-4xl">{member.name}</h3>
              <h4 className="mb-4 text-2xl">{member.role}</h4>
              <div className="flex justify-between md:justify-start md:gap-5">
                {member.social_links.map((link, linkIndex) => (
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={linkIndex}
                  >
                    <img
                      src={socialLinkLogos[linkIndex]}
                      data-aos="fade-in"
                      className="h-20 w-full transition-all duration-500 ease-in-out hover:shadow-xl"
                      alt="Social Link Logo"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="container m-auto mb-20 px-5">
        <h2 className="py-20 text-center text-4xl md:text-5xl">
          Our Tech and Design Stack
        </h2>
        <div className="flex flex-col items-center gap-10 md:flex-row md:flex-wrap">
          {techStackLogos.map((logo, logoIndex) => (
            <img
              data-aos="fade-up"
              className="h-full w-36"
              src={logo.src}
              alt={logo.alt}
              key={logoIndex}
            />
          ))}
        </div>
      </section>
    </>
  );
}
