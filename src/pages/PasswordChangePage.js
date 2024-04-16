import React from 'react';

class PasswordChangePage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="left-block">
          <h2>Левый блок</h2>
          <div className="buttons">
            {[...Array(8)].map((_, index) => (
              <button key={index} className="button">Кнопка {index + 1}</button>
            ))}
          </div>
        </div>
        <div className="right-block">
          <h2>Правый блок</h2>
          <div className="password-change">
            <h3>Изменить пароль</h3>
            <input type="password" placeholder="Старый пароль" />
            <input type="password" placeholder="Новый пароль" />
            <input type="password" placeholder="Подтвердить новый пароль" />
            <button className="change-button">Изменить</button>
          </div>
          <div className="text">
            <p>Это текст в правом блоке.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordChangePage;
