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
  const videoId = "pt3_ryl6q4.mp4";
  const cloudName = "dp0h5vpsz";

  return (
    <>
      <h1>wedloc</h1>
      <Router>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/singleview">SingleView</a>
          </li>
          <li>
            <a href="/eventspace">EventSpace</a>
          </li>
          <li>
            <a href="/livechat">LiveChat</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleview" element={<SingleView cloudName={cloudName} videoId={videoId} />} />
          <Route path="/eventspace" element={<EventSpace />} />
          <Route path="/livechat" element={<LiveChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload cloudName={cloudName}/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
