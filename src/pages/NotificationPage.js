import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../logo.png';
import university from '../University.jpg';
import '../styles/NotificationPage.css';
import ButtonPage from '../components/buttinpageadmin';

const NotificationPage = ({ user }) => {
  let [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [foundStudents, setFoundStudents] = useState([]);
  const [error, setError] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [succesfuly, setSucces] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [searching, setSearching] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');

  const handleSearchInputChange = (e) => {
    setSucces('')
    setSearchInput(e.target.value);
    setUserData(null);
    setFoundStudents([]); // Clear the list of found students when the search input changes
  };

  const handleSendMessage = async () => {
    setConfirmDeleteState()
    setSucces('')

    if (!searchInput) {
      setError('Please enter Email, ID, Name, or Surname.');
      setConfirmDeleteState('err');

      return;
    } else {
      setButtonClicked(true);
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
        const studentsData = await response.json();
  
        if (response.ok) {
          setUserData(studentsData);
          setFoundStudents(studentsData.students || []);
          setError('');
        } else {
          const errorMessage = studentsData.message || 'User not found.';
          setError(errorMessage);
          setConfirmDeleteState('err');

          setUserData(null);
          setFoundStudents([]);
        }
  
        setConfirmSend(true);
        setError('');
      } catch (error) {
        console.error('Error:', error);
        setConfirmDeleteState('err');

        setError('An error occurred while searching user data.');
      } finally {
        setButtonClicked(false);
        setSearching(false);
      }
    }
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

  const handleSendNotification = async () => {
    setError('');
    setSucces('')
    if (!userData) {setConfirmDeleteState('err');return;}

    if (!title.trim() || !message.trim()) {
      setError("Please fill in both Title and Message fields.");
      return;
    }

    setButtonClicked(true);
    try {
      const response = await fetch('https://backendswt.onrender.com/api/notification/sent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          from: user.getId(),
          to: userData.ID
        }),
      });
      const responseData = await response;
      if (response.ok) {
        console.log('Sending notification to:', userData.UserName);
        setConfirmDeleteState('suc')
        setError('')
        setSucces('')
        setSearchInput('')
        setSucces('Message send to user')
      }
      else {
        setConfirmDeleteState('err');
        setError(responseData.message || 'An error occurred during registration.');
      }

      setConfirmSend(false);
      setUserData(null);
      setConfirmDelete('');
      setMessage('');
      setTitle('');
      setShowMessageDialog(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while sending the notification.');
    } finally {
      setButtonClicked(false);
    }
  };

  return (
    <div className="notifpage">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="boxmagick">
          <img src={university} alt="University" />
        </div>
      </div>
      <div className='line'></div>
      <div className='main-block'>
        <div className='left-block'>
          <ButtonPage></ButtonPage>
        </div>
        <div className='line-vertical'></div>

        <div className='right-block'>
          <h1 className='title'>Send Notification</h1>

          <div className="input-container">
            <span>Email, ID, Name, or Surname:</span>
            <input type="text" value={searchInput} onChange={handleSearchInputChange} />
            <button onClick={handleSendMessage} disabled={buttonClicked}>
              {buttonClicked ? "Searching..." : "Search"}
            </button>

            {foundStudents.length > 0 && (
              <div>
                <h2>Found Students:</h2>
                <ul>
                  {foundStudents.map((student, index) => (
                    <li key={index}>{student.name}</li>
                  ))}
                </ul>
              </div>
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
                <button onClick={() => setShowMessageDialog(true)}>Message</button>
              </div>  
            )}

            {showMessageDialog && (
              <div className="confirm-send">
                <h2 className="send-message-title">Send Message</h2>
                <div className="title-container">
                  <span className='confirm-title'>Title:</span>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="message-container">
                  <span>Message:</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                {error && <p className="error-message">{error}</p>}
                {succesfuly && <p className="succes-message">{succesfuly}</p>}

                <div className="buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                  <button onClick={handleSendNotification} disabled={buttonClicked} className="send-button">
                    {buttonClicked ? "Sending..." : "Send"}
                  </button>
                  <button onClick={() => { setShowMessageDialog(false); setError(''); }} className="cancel-button">Cancel</button>
                </div>
              </div>
            )}
            {succesfuly && <p className="succes-message">{succesfuly}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>

        </div>
      </div>

    </div>
  );
};

export default NotificationPage;
