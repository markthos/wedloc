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
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dp0h5vpsz" } });
  const videoId = "pt3_ryl6q4.mp4";
  const cloudName = "dp0h5vpsz";

  return (
    <>
      
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleview" element={<SingleView cloudName={cloudName} videoId={videoId} />} />
          <Route path="/eventspace" element={<EventSpace />} />
          <Route path="/livechat" element={<LiveChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload cloudName={cloudName}/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
