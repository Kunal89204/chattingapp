import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PrivateChat from './pages/PrivateChat';
import ProtectedRoute from './components/ProtectedRoute';
import GroupChat from './pages/GroupChat';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthStore } from './context/store';
import {io} from "socket.io-client"
import Navbar from './components/Navbar';



export const socket = io("https://chattarpattarkabackend.onrender.com")

const App = () => {
  const {validateToken} = useAuthStore()
  useEffect(() => {
    validateToken();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/chat/private/:userId1/:userId2' element={<ProtectedRoute><PrivateChat /></ProtectedRoute>} />
        <Route path="/chat/group/:groupId" element={<ProtectedRoute><GroupChat /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;


