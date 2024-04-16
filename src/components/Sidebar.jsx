import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../styles/sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/adduserpage">Course</Link>
        </li>
        <li>
          <Link to="/removeuserpage">Attendance Tracker</Link>
        </li>
        <li>
          <Link to="/studentnotificationpage">Notification</Link>
        </li>
        <li>
          <Link to="/page-four">Page Four</Link>
        </li>
        <li>
          <Link to="/page-five">Page Five</Link>
        </li>
        <li>
          <Link to="/page-six">Page Six</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
