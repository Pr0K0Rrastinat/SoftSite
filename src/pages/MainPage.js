import React from 'react';
import { useAuth } from '../pages/AuthContext';

const MainPage = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <div>
    <h1>Welcome to the Main Page</h1>
    {userRole && <p>You are logged in as: {userRole}</p>}
    {/* Add the rest of your main page content here */}
  </div>
  );
};

export default MainPage;
