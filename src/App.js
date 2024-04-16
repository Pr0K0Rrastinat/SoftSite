// App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import MainPage from './pages/MainPage.js';
import ForgetPass from './pages/ForgetPass.js';
import PasswordChangePage from './pages/PasswordChangePage.js';
import AdminMainPage from './pages/AdminMainPage.js';
import AddUserPage from './pages/AddUserPage.js';
import RemoveUserPage from './pages/RemoveUserPage.js';
import NotificationPage from './pages/NotificationPage.js';
import StudentPage from './pages/StudentPage.js';
import StudentNotification from './pages/StudentNotification.js';

const App = () => {
  const [user, setUser] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login userSetter={setUser} />} />
        <Route path="/login" element={<Login userSetter={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/settingspage" element={<PasswordChangePage />} />
        <Route path="/adminmainpage" element={<AdminMainPage user={user} />} />
        <Route path="/adduserpage" element={<AddUserPage />} />
        <Route path="/removeuserpage" element={<RemoveUserPage />} />
        <Route path="/notificationpage" element={<NotificationPage user={user} />} />
        <Route path="/studentpage" element={<StudentPage user={user}/>} />
        <Route path="/studentnotificationpage" element={<StudentNotification user={user}/>} />


      </Routes>
    </Router>
  );
};

export default App;
