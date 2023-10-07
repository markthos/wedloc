import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  Comment,
  EventCreator,
  EventSpace,
  Home,
  LiveChat,
  Login,
  Profile,
  Signup,
  Upload,
} from './pages';
import './App.css';
import SiteNav from './components/SiteNav';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <SiteNav />
      <Routes>
        <Route path="/comment" element={<Comment />} />
        <Route path="/event-creator" element={<EventCreator />} />
        <Route path="/event-space" element={<EventSpace />} />
        <Route path="/" element={<Home />} />
        <Route path="/live-chat" element={<LiveChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
}

export default App
