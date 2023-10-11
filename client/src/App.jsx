import { Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  SingleView,
  EventSpace,
  Home,
  LiveChat,
  Login,
  Signup,
  Upload,
  Profile,
  About,
  EventCreator,
  AttendeeSignup,
} from "./Pages";
import "./App.css";
import { Cloudinary } from "@cloudinary/url-gen"; // import Cloudinary
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dp0h5vpsz" } }); // Create a Cloudinary instance
  const cloudName = "dp0h5vpsz"; // Our Cloudinary cloud name

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendeesignup/:eventId" element={<AttendeeSignup />} />
          <Route
            path="/eventspace/:eventId/singleview/:postId"
            element={<SingleView />}
          />
          <Route path="/eventspace/:eventId" element={<EventSpace />} />
          <Route path="/eventspace/:eventId/livechat" element={<LiveChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/eventspace/:eventId/upload"
            element={<Upload cloudName={cloudName} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/eventcreator" element={<EventCreator />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}
