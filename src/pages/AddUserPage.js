import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/adduserpage.css';
import User from '../User';
import logo from '../logo.png';
import university from '../University.jpg'
import ButtonPage from '../components/buttinpageadmin';

const AddUserPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handlePassportChange = (e) => {
        setPassword(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
        setError('');
        setSuccessMessage('');
    };

    const setClearInputs=(e)=>{
      setName('');
      setSurname('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setRole('');
      setId('');
    };

    const handleAddUser = async () => {
        const user = new User(name, surname, email, phoneNumber, password, role, id);

        if (!user.name || !user.surname || !user.email || !user.phoneNumber || !user.password || !user.role || !user.id) {
            setError('Please fill in all fields.');
            document.querySelector('.form-container').classList.add('error');

            return;
        }

        try {
            const response = await fetch('https://backendswt.onrender.com/api/add', {
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
                    ID: user.id
                }),
            });

            const data = await response.json();

            if (data.token && data.token.accessToken) {
              setRole(user.role);
              setRedirect(true);
              document.querySelector('.form-container').classList.remove('error');
              setClearInputs();
              setSuccessMessage('User successfully added.');
              setTimeout(() => {
                document.querySelector('.form-container').classList.add('success');
            }, 50); // Добавлено небольшая задержка перед добавлением класса
            setTimeout(() => {
                document.querySelector('.form-container').classList.remove('success');
            }, 3000);
          } else {
            setError(data.message || 'An error occurred during registration.');
            document.querySelector('.form-container').classList.add('error');
        }
      } catch (error) {
          console.error('Error:', error);
          setError('An error occurred during Adding.');
          document.querySelector('.form-container').classList.add('error');
      }
    };

    return (
        <div className="register-container">
            <div className="header">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className='boxmagick'>
                    <img src={university} alt="University" />
                </div>
            </div>
            <div className='line'></div>
            <div className="main-block">
                <div className="left-block">
                    <ButtonPage></ButtonPage>
                </div>
                <div className="form-container">
                    <h1 className='addPeople'>Add User</h1>
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

          {error && !successMessage && <p className="error-message">{error}</p>}
          {!error && successMessage && <p className="success-message">{successMessage}</p>}


                    <button onClick={handleAddUser}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddUserPage;
