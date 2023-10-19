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
// Logos for social links
import githublogo from "./assets/img/logos/github_square_logo.svg";
import linkedinlogo from "./assets/img/logos/linkedin_rect_logo.svg";
import pflogo from "./assets/img/logos/pf_logo.svg";
// Logos for tech stack
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
// Arrays to loop through for images
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
    <div className="overflow-hidden">
      {/* About the project section */}
      <section className="container m-auto px-5 pb-20">
        <h1 className="py-10 text-center text-4xl md:text-left md:text-6xl">
          How we did it...
        </h1>
        <h2
          data-aos="fade-in"
          data-aos-once="true"
          className="mb-10 text-center text-3xl md:text-4xl"
        >
          Initial Pitch and Ideas
        </h2>
        <div className="mb-10 flex flex-col gap-10 md:flex-row">
          <img
            data-aos="flip-down"
            data-aos-once="true"
            className="h-auto rounded-3xl object-cover shadow-2xl md:w-1/2"
            src={ideasPhase}
            alt="Ideas Phase Figma"
          />
          <p
            data-aos="fade-right"
            data-aos-once="true"
            data-aos-delay="300"
            data-aos-offset="0"
            className="font-serif text-4xl"
          >
            We started our website to meet a unique need: a social platform just
            for wedding photographers and videographers. It lets pros organize
            and share wedding media easily, so couples and guests can relive the
            special moments. Plus, we added features like media comments and
            real-time chat without requiring attendees to sign up.
          </p>
        </div>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-full md:w-1/3">
            <h2
              data-aos="fade-right"
              data-aos-once="true"
              className="mb-5 text-3xl"
            >
              Pre-Development
            </h2>
            <p
              data-aos="fade-right"
              data-aos-once="true"
              className="mb-10 font-serif text-3xl"
            >
              We carefully planned the website's user experience and
              functionality using Figma for wireframes and mockups. It sped up
              design and development iterations.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-delay="300"
              data-aos-offset="0"
              className="mb-5 text-3xl"
            >
              Development
            </h2>
            <p
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-delay="300"
              data-aos-offset="0"
              className="mb-10 font-serif text-3xl"
            >
              Our dedicated team of developers used modern web technologies like
              React, MongoDB, GraphQL, TailwindCSS, and MaterialUI to create a
              robust and responsive web app during the development phase.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-delay="600"
              data-aos-offset="0"
              className="mb-5 text-3xl"
            >
              Continuous Deployment
            </h2>
            <p
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-delay="600"
              data-aos-offset="0"
              className="mb-10 font-serif text-3xl"
            >
              To avoid major bugs, we deployed our site regularly from halfway
              through development to the final launch. This early detection and
              fixing prevented major issues.
            </p>
          </div>
        </div>
        <img
          data-aos="flip-down"
          data-aos-once="true"
          className="mb-10 h-auto w-full rounded-3xl object-cover shadow-2xl"
          src={preDevPhase}
          alt="Figma Mockup of Site"
        />
        <h2
          data-aos="fade-up"
          data-aos-once="true"
          className="mb-5 text-3xl md:text-center"
        >
          Future Development
        </h2>
        <p
          data-aos="fade-up"
          data-aos-once="true"
          className="font-serif text-4xl"
        >
          We're dedicated to ongoing improvement and growth. Expect upgrades
          like better event management, mobile apps for easy access, and more
          social engagement tools. We aim to lead in event media sharing and
          interaction tech.
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
                data-aos-once="true"
                className="w-full rounded-2xl shadow-2xl"
                src={teamPics[teamIndex]}
                alt={member.name + " Profile pic"}
              />
            </div>
            <div data-aos="fade-left" data-aos-once="true" className="md:w-1/2">
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
              data-aos="flip-down"
              data-aos-once="true"
              className="h-full w-36"
              src={logo.src}
              alt={logo.alt}
              key={logoIndex}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
