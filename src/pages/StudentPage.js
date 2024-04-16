import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';
import Sidebar from '../components/Sidebar'; // Подставьте правильный путь к компоненту Sidebar

const StudentPage = ({ user }) => {
  return (
    <div className="main-page">
      <div className="background"></div>  
      <div className="content">
        <h1>Welcome {user.getName()}</h1>
        <div className="line"></div>
        <div className="buttons-container">
          <div className="button-row">
            <Link to="/adduserpage">
              <button type="button"> Course </button>
            </Link>
            <Link to="/removeuserpage">
              <button type="button">Attendance Tracker</button>
            </Link>
          </div>
          <div className="button-row">
            <Link to="/studentnotificationpage">
              <button type="button">Notification</button>
            </Link>
            <Link to="/another-page">
              <button type="button">Another Page</button>
            </Link>
          </div>
          <div className="button-row">
            <Link to="/page-one">
              <button type="button">Page One</button>
            </Link>
            <Link to="/page-two">
              <button type="button">Page Two</button>
            </Link>
          </div>
        </div>
        <div className="logout">
          <Link to="/login">
            <button type="button">[Log Out]</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
