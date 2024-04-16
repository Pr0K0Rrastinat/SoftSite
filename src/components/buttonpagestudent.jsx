import React from 'react';
import '../styles/buttonpage.css'
import { Link } from 'react-router-dom';


class ButtonPage extends React.Component {
  render() {
    return (
      <div className="button-container">
       <Link to="/course-register">
          <button className="button">Course Register</button>
        </Link>
        <Link to="/course-schedule">
          <button className="button">Course Schedule</button>
        </Link>
        <Link to="/attendance">
          <button className="button">Electronic Attendance</button>
        </Link>
        <Link to="/settings">
          <button className="button">Settings</button>
        </Link>
        <Link to="/studentnotificationpage">
          <button className="button">Notification</button>
        </Link>
        <Link to="/permission">
          <button className="button">Permission</button>
        </Link>
        <Link to="/login">
          <button className="button">Sign Out</button>
        </Link>
      </div>
    );
  }
}

export default ButtonPage;
