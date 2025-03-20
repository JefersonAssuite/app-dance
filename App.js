import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Feed from './components/Feed';
import { auth } from './services/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
      <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
        <Route path="/login"  element={!user ? <Login /> : <Navigate to="/feed" />} />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App; 