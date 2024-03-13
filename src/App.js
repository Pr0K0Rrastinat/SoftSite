import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import ForgetPass from './pages/ForgetPass';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
      </Routes>
    </Router>
  );
};

export default App;

