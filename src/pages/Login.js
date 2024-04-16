import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Login.css';
import User from '../User';
import logo from '../logo.png';
import university from '../University.jpg';

const Login = ({userSetter}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checkadmin, setRedirect] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [checkstudent,setStudent]=useState(false);
  const user = new User();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setInputError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setInputError(false);
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
          body: JSON.stringify({ idOrEmail: username, password }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        const data = await response.json();
        if (data.userEmail) {
          console.log('Success');
          const userRole = data.userRole;
          console.log(userRole);
          localStorage.setItem('email', username);
          user.setId(data.ID);
          user.setRole(userRole);
          user.setSurname(data.UserSurname);
          user.setName(data.UserName);
          user.setPhone(data.phone);
          userSetter(user)
          console.log(data.ID);
          // Перенаправление на страницу администратора
          if (userRole === 'admin') {
            setRedirect(true);
            console.log('Yes')
            return <Navigate to='/adduserpage' />;
          }
          //Перенапрявляем на страницу студента
          else if(userRole === 'student'){
            setStudent(true);
          }
        }
        else {
          // Обработка ошибок и отображение сообщения об ошибке
          setError(data.token.message);
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
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className='login-form-container'>
          <form onSubmit={handleSubmit}>  
            <div className={`input-group ${inputError ? 'error' : ''}`}>
              <h2>Welcome to H.U</h2>
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
              <p className="forgot-password"><Link to="/forgetpass">Forget password?</Link></p> 
            </div>
            {error && <p className="error-message">{error}</p>}
            
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
        <img src={university} alt="University" />
      </div>
      {checkadmin && <Navigate to="/adduserpage" />}
      {checkstudent && <Navigate to="/studentnotificationpage" />}
    </div>
  );
};

export default Login;
