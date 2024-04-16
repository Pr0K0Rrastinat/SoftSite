// Register.js

import React, { useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import '../styles/Register.css';
import User from '../User';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);


  const handleNameChange = (e) => {
      setName(e.target.value);
      console.log("Name:", e.target.value);
    };
  
    const handleSurnameChange = (e) => {
      setSurname(e.target.value);
      console.log("Surname:", e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      console.log("Email:", e.target.value);
    };
  
    const handlePhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
      console.log("Phone Number:", e.target.value);
    };
  
    const handlePassportChange = (e) => {
      setPassword(e.target.value);
      console.log("Password:", e.target.value);
    };
  
    const handleRoleChange = (e) => {
      setRole(e.target.value);
      console.log("Role:", e.target.value);
    };
  
    const handleIdChange = (e) => {
      setId(e.target.value);
      console.log("ID:", e.target.value);
    };
  
    const handleRegister = async () => {

      const user = new User(name, surname, email, phoneNumber, password, role, id);
      
      console.log('user:', user);
      
      if (!user.name || !user.surname || !user.email || !user.phoneNumber || !user.password || !user.role || !user.id) {
        setError('Please fill in all fields.');
        return;
      }
    
      try {
        const response = await fetch('https://backendswt.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            surName: user.surname,
            email: user.email,
            password: user.password,
            userRole: user.role,
            phone: user.phoneNumber,
            ID:user.id
          }),
        });
    
        const data = await response.json();
    
        if (data.token && data.token.accessToken) {
          console.log('Success');
          setRole(user.role);
          setRedirect(true);
        } else {
          setError(data.message || 'An error occurred during registration.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during registration.');
      }
    };
    
  
    return (
      <div className="register-container">
        <div className="header">
          <div className="logo-container">
            <img src='./statics/logo.png' alt="Logo" className="logo" />
          </div>
          <div className='boxmagick'>
            <img src='./statics/University.jpg' alt="University" />
          </div>
        </div>
        <div className="form-container">
          <h1>Registration</h1>
          <label>
            <span>name:</span>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className={`styled-input ${!name && error ? 'error' : ''}`}
            />  
          </label>
  
          <label>
            <span>surname:</span>
            <input
              type="text"
              value={surname}
              onChange={handleSurnameChange}
              className={`styled-input ${!surname && error ? 'error' : ''}`}
            />
          </label>
  
          <label>
            <span>email:</span>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`styled-input ${!email && error ? 'error' : ''}`}
            />
          </label>

          <label>
            <span>id:</span>
            <input
              type="text"
              value={id}
              onChange={handleIdChange}
              className={`styled-input ${!id && error ? 'error' : ''}`}
            />
          </label>
  
          <label>
            <span>phone number:</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className={`styled-input ${!phoneNumber && error ? 'error' : ''}`}
            />
          </label>
  
          <label>
            <span>password:</span>
            <input
              type="password"
              value={password}
              onChange={handlePassportChange}
              className={`styled-input ${!password && error ? 'error' : ''}`}
            />
          </label>
  
          <label>
            <span>role:</span>
            <select
              value={role}
              onChange={handleRoleChange}
              className={`styled-input ${!role && error ? 'error' : ''}`}
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </label>
  
          {error && <p className="error-message">{error}</p>}
          {redirect && <Navigate to='/' />}
          <button onClick={handleRegister}>Register</button>
        </div>
        <div className="back-button">
          <Link to="/" className="back-button">Back</Link>
        </div>
      </div>
    );
  };
  
  export default Register;