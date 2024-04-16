import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainpage.css';

const AdminMainPage = ({ user }) => {
  return (
    <div className="main-page">
      <div className="background"></div>
      <div className="content">
        <h1>Welcome, {user.getName()}</h1>
        <div className="line"></div>
        <div className="buttons">
          <div className="button-column">
            <Link to="/adduserpage">
              <button type="button"> Add User </button>
            </Link>
            <Link to="/removeuserpage">
              <button type="button">Remove User</button>
            </Link>
          </div>
          <div className="button-column">
            <Link to="/notificationpage">
              <button type="button">Notification</button>
            </Link>
          </div>
          <div className="button-column">
            <Link to="/studentnotificationpage">
              <button type="button">View Documents</button>
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

export default AdminMainPage;
