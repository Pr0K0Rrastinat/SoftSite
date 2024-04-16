import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';
import User from '../User';

const MainPage = () => {
  const userRole = localStorage.getItem('userRole');
  const user = new User();

  return (
    <div className="main-page">
      <div className="background"></div>
      <div className="content">
        <h1>Welcome to the Main Page</h1>
        <div className="line"></div>

        {userRole && <p>You are logged in as: {user.getRole()}</p>}
        <div className="buttons">
          <Link to="/settingspage">
            <button type="button">Settings</button>
          </Link>
          <Link to="/settingspage">
            <button type="button">Attendence</button>
          </Link>
          <Link to="/settingspage">
            <button type="button">Settings</button>
          </Link> 
          {/* Добавьте остальные кнопки здесь */}
        </div>
        <div className="logout">
          <Link to="/">
            <button type="button">[Log Out]</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
