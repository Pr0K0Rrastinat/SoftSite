import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../pages/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setInputError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setInputError(false);
  };

  const handleSetRole = (userRole) => {
    localStorage.setItem('userRole', userRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      setInputError(true);
      return;
    } else {
      setError('');

      try {
        const response = await fetch('https://backendswt.onrender.com/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: username, password }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });

        const data = await response.json();

        if (data.token.accessToken) {
          console.log('Success');
          const userRole = data.userRole;
          console.log(userRole);
          localStorage.setItem('email', username);
          handleSetRole(userRole);

          setRedirect(true);

        } else {
          // Обработка ошибок и отображение сообщения об ошибке
          setError(data.token.accessToken.message);
          setInputError(true);
        }
      } catch (error) {
        console.error('Ошибка:', error);
        setError('An error occurred while logging in.');
        setInputError(true);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left-block-login">
        <div className="logo-container">
          <img src='./statics/logo.png' alt="Logo" className="logo" />
        </div>

        <div className='login-form-container'>
          <form onSubmit={handleSubmit}>
            <div className={`input-group ${inputError ? 'error' : ''}`}>
              <h2>Information System</h2>
              <label>ID or Email</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className={`input-group ${inputError ? 'error' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="forgot-password">
              <p className="forgot-password"><a href="./ForgetPass">Forget password?</a></p>
            </div>
            {error && <p className="error-message">{error}</p>}
            {redirect && <Navigate to='/main' />}
            <div className="button-group">
              <button type="submit">Login</button>
              <Link to="/register">
                <button type="button">Sign Up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="image-container">
        <img src='./statics/University.jpg' alt="University" />
      </div>
    </div>
  );
};

export default Login;
