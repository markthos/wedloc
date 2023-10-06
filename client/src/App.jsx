import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Comment, EventSpace, Home, LiveChat, Login, Signup, Upload } from './components/Pages';
import './App.css';

const App = () => {
  return (
    <>
      <h1>wedloc</h1>
      <Comment />
      <EventSpace />
      <Home />
      <LiveChat />
      <Login />
      <Signup />
      <Upload />
    </>
  )
}

export default App
