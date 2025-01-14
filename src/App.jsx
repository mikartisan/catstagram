import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <AuthGuard>
              <EditProfile />
            </AuthGuard>
          }
        />
        <Route
          path="/post"
          element={
            <AuthGuard>
              <Post />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
