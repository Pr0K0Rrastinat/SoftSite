import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import ForgetPass from './ForgetPass';

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

