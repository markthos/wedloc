import { Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {SingleView, EventSpace, Home, LiveChat, Login, Signup, Upload, Profile, About, EventCreator} from "./Pages";
import "./App.css";
import { Cloudinary } from "@cloudinary/url-gen"; // import Cloudinary
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dp0h5vpsz" } });
  const videoId = "pt3_ryl6q4.mp4";
  const cloudName = "dp0h5vpsz";

  const hardCodedSeedCapsule = "6525b9501d305b31276141b2"

  return (
    <ApolloProvider client={client}>
      <Header />
      {<NavMenu />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleview" element={<SingleView cloudName={cloudName} videoId={videoId} />} /> 
        <Route path="/eventspace" element={<EventSpace />} />
        <Route path="/eventspace/:id" element={<EventSpace />} />
        <Route path="/livechat" element={<LiveChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload cloudName={cloudName}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/eventcreator" element={<EventCreator />} />
      </Routes>
      <Footer />
    </ApolloProvider>
  );
};