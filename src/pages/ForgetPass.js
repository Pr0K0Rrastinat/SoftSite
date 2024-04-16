import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import '../styles/ForgetPass.css';

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const [codeForRecovery, setCodeForRecovery] = useState('123');

const handleSetEmail = async () => {
    console.log('Sending')
    if (!email) {
      setError('Please fill in all fields.');
      return;
    } else {
      try {
        const response = await fetch('https://backendswt.onrender.com/api/auth/password_recovery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.codeForRecovery) {
            setCodeForRecovery(data.codeForRecovery); // Обновление переменной codeForRecovery
            console.log('Success');
            setError('');
            console.log('Sent:', { email });
            console.log(codeForRecovery)

            setButtonClicked(true);
            setCodeSent(true);
        } else {
          // Обработка ошибок и отображениsе сообщения об ошибке
          setError(data.message);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
      
    }
};

  const handleVerifyCode = () => {
            if (code === codeForRecovery) {
                setCodeEntered(true);
              } else {
                setError('Invalid code. Please try again.');
              }
         
    // Simulate verifying the entered code (you can replace this with your actual logic)
    
  };

  const handleSetNewPassword = async() => {
    // Добавьте логику для проверки, совпадают ли новый и подтвержденный пароли
    if (!newPassword) {
      setError('Please write new password.');
      return;
    }
    else{
        try {
            const response = await fetch('https://backendswt.onrender.com/api/auth/reset_password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password: newPassword, savedReceveryCode: codeForRecovery, recoveryCode: code }),
            });
      
            const data = await response.json();
      
            if (data) {
                console.log('New Password:', { newPassword });
              setRedirect(true);
            } else {
              setError(data.message);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

  };

  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img src='./statics/logo.png' alt="Logo" className="logo" />
        </div>
        <div className='boxmagick'>
          <img src='./statics/University.jpg' alt="University" />
        </div>
      </div>
      <h1>Forget the password?</h1>
      <h2>
        {codeEntered
          ? "Enter your new password"
          : codeSent
            ? "Enter the code that was sent to your email"
            : "To start password reset process please enter the email"}
      </h2>
      <div className="input-conteiner">
        {codeSent && !codeEntered ? (
          <>
            <span>Code:</span>
            <input type="text" value={code} onChange={handleCodeChange} />
            <button onClick={handleVerifyCode}>
              {buttonClicked ? "Verifying..." : "Enter"}
            </button>
          </>
        ) : codeEntered ? (
          <>
            <span>New Password:</span>
            <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
            <button onClick={handleSetNewPassword}>
              {buttonClicked ? "Setting..." : "Set Password"}
            </button>
          </>
        ) : (
          <>
            <span>Email:</span>
            <input type="text" value={email} onChange={handleEmailChange} />
            <button onClick={handleSetEmail}>
              {buttonClicked ? "Loading..." : "Enter"}
            </button>
          </>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      <h3>
        {codeSent
          ? "Example code: 123456"
          : "Example : example@gmail.com"}
      </h3>
      <div className="back-button">
        <Link to="/" className="back-button">Back</Link>
      </div>
      {redirect && <Navigate to="/" />}
    </div>
  );
};

export default ForgetPass;