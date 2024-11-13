import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';
import Home from './pages/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
