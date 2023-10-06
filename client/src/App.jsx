import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  SingleView,
  EventSpace,
  Home,
  LiveChat,
  Login,
  Signup,
  Upload,
} from "./components/Pages";
import "./App.css";
import { Cloudinary } from "@cloudinary/url-gen"; // import Cloudinary

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dp0h5vpsz" } });
  const videoId = "pt3_ryl6q4.jpg"
  const cloudName = "dp0h5vpsz"

  
  return (
    <>
      <h1>wedloc</h1>
      <SingleView cloudName={cloudName} videoId={videoId}/>
      <EventSpace />
      <Home />
      <LiveChat />
      <Login />
      <Signup />
      <Upload cloudName={cloudName} />
    </>
  );
};

export default App;
