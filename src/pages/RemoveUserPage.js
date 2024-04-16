import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../logo.png';
import university from '../University.jpg';
import '../styles/RemoveUserPage.css';
import ButtonPage from '../components/buttinpageadmin';

const RemoveUserPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searching, setSearching] = useState(false); // Добавлено состояние для отслеживания состояния поиска
  const [successDelete, setSuccessDelete] = useState(false); // Добавлено состояние для отслеживания успешного удаления пользователя

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setUserData(null);
    setError('') 
  };

  const setConfirmDeleteState = (val) => {
    if (val === 'suc') {
      document.querySelector('.input-container').classList.remove('error');
      document.querySelector('.input-container').classList.add('success');
      setTimeout(() => {
        document.querySelector('.input-container').classList.remove('success');
      }, 3000);
      
    } else if (val === 'err') {
      document.querySelector('.input-container').classList.add('error');
    }
    else{
      document.querySelector('.input-container').classList.remove('success');
      document.querySelector('.input-container').classList.remove('error');
    }
  };
  

  const handleSearchUser = async () => {
    setConfirmDeleteState()

    if (!searchInput) {
      setError('Please enter id.');
      setConfirmDeleteState('err');
      return;
    } else {
      setButtonClicked(true);
      setSearching(true); // Устанавливаем состояние поиска в true при начале поиска
      let requestData = {};
  
      // Проверка ввода на ID
      if (/^\d+$/.test(searchInput)) {
        requestData = { ID: searchInput, Name: '', surName: '', email: "" };
      } else if (searchInput.includes('@')) {
        // Проверка ввода на Email
        requestData = { ID: "", Name: "", surName: "", email: searchInput };
      } else {
        // По умолчанию, если ввод не является ни ID, ни Email, предполагается, что это Name и Surname
        const [name, surname] = searchInput.split(' ');
        requestData = { ID: "", Name: name, surName: surname, email: "" };
      }
  
      try {
        const response = await fetch('https://backendswt.onrender.com/api/find', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        });
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
          setError('');
        } else {
          setUserData(null);
          setError(data.message || 'User not found.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching user data.');
      } finally {
        setButtonClicked(false);
        setSearching(false); // Поиск завершен, устанавливаем состояние поиска в false
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!userData){setConfirmDeleteState('err'); return;}

    setButtonClicked(true);
    try {
      const response = await fetch('https://backendswt.onrender.com/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: searchInput,
        }),
      });

      const confirmdata = await response;

      if (response.ok) {
        console.log('Success');
        setConfirmDeleteState('suc')
        setError('User remove succesfuly')
        setSearchInput('')
        setSuccessDelete(true); // Устанавливаем состояние успешного удаления в true
      } else {
        setConfirmDeleteState('err');
        setError(confirmdata.message || 'An error occurred during removing.');
      }
      console.log('Deleting user:', userData.UserName);
      setConfirmDelete(''); // Скрыть окно подтверждения удаления
      setUserData(null); // Очистить данные пользователя
      setError(''); // Сбросить сообщение об ошибке
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while deleting the user.');
    } finally {
      setButtonClicked(false);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="boxmagick">
          <img src={university} alt="University" />
        </div>
      </div>
      <div className='line'></div>
      <div className="main-block">
        <div className="left-block">
          <ButtonPage></ButtonPage>
        </div>
        <div className='line-vertical'></div>
        <div className='right-block'>
          <h1>Remove User</h1>
          <div className={`input-container ${successDelete ? 'success' : ''} ${error ? 'error' : ''}`}>
            
            <span>Enter the ID:</span>
            <input type="text" value={searchInput} onChange={handleSearchInputChange} />
            { !userData && !searching && (
              <button onClick={handleSearchUser}>
                {buttonClicked ? "Searching..." : "Search"}
              </button>
            )}
            {userData && (
              <div className="user-info" style={{ border: "1px solid black", padding: "10px", display: "flex", alignItems: "center" }}>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "5px", textAlign: "right" }}>Name:</td>
                    <td style={{ padding: "5px" }}>{userData.UserName}</td>
                    <td style={{ padding: "5px", textAlign: "right" }}>Email:</td>
                    <td style={{ padding: "5px" }}>{userData.userEmail}</td>
                  </tr>
                </tbody>
              </table>
          
                <button onClick={() => setConfirmDelete(true)}>Delete</button>
              </div>
            )}
            {confirmDelete && (
              <div className="confirm-delete">
                <p>Are you sure you want to delete this user?</p>
                <div className='button-conteiner'>
                  <button onClick={handleDeleteUser}>
                    {buttonClicked ? "Deleting..." : "Confirm"}
                  </button>
                  <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                </div>
              </div>
            )}
            {!userData && searching && <p className="searching-message">Searching...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserPage;
