import React from 'react';
import '../styles/buttonpage.css'
import { Link } from 'react-router-dom';


class ButtonPageAdmin extends React.Component {
  render() {
    return (
      <div className="button-container">
      <Link to="/adduserpage">
          <button className="button">Add User</button>
        </Link>
        <Link to="/removeuserpage">
          <button className="button">Remove User</button>
        </Link>
        <Link to="/notificationpage">
          <button className="button">Notification</button>
        </Link>
        <Link to="/settings">
          <button className="button">View Attendence</button>
        </Link>
        <Link to="/studentnotificationpage">
          <button className="button">View Documents</button>
        </Link>
        <Link to="/login">
          <button className="button">Sign Out</button>
        </Link>
      </div>
    );
  }
}

export default ButtonPageAdmin;
