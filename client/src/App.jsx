import { Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  SingleView,
  EventSpace,
  Home,
  LiveChat,
  Login,
  Signup,
  Profile,
  About,
  EventCreator,
  AttendeeSignup,
  MyEvents,
  PayMent,
  SignOut,
  QRCode,
} from "./Pages";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem("id_token")}`,
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* This is so the entire header, main, and footer sections will show (without a scroll bar)
        so long as the content doesn't exceed the viewport height */}
        <div className="flex h-screen flex-col">
          <Header />
          {/* Main content area - this will grow to take up available space */}
          <main className="flex-grow bg-main_bg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/eventspace/:eventId/attendeesignup"
                element={<AttendeeSignup />}
              />
              <Route
                path="/eventspace/:eventId/singleview/:postId"
                element={<SingleView />}
              />
              <Route path="/eventspace/:eventId" element={<EventSpace />} />
              <Route
                path="/eventspace/:eventId/livechat"
                element={<LiveChat />}
              />
              <Route path="/eventspace/:eventId/qrcode" element={<QRCode/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/eventcreator" element={<EventCreator />} />
              <Route path="/myevents" element={<MyEvents />} />
              <Route path="/payment" element={<PayMent />} />
              <Route path="/signout" element={<SignOut />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
