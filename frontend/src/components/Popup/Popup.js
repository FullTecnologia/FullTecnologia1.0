import React from 'react';
import './styles.css';

function Popup({ mostrar, fecharPopup }) {
  if (!mostrar) {
    return null;
  }

  const fecharPopupHandler = (event) => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['popup-close', 'popup-link', 'popup-wrapper'];
    const shouldClosePopup = classNames.some((className) => className === classNameOfClickedElement);

    if (shouldClosePopup) {
      fecharPopup();
    }
  };

  return (
    <div className="popup-wrapper" onClick={fecharPopupHandler}>
      <div className="popup" onClick={(event) => event.stopPropagation()}>
        <div className="popup-close" onClick={fecharPopup}>
          x
        </div>
        <div className="popup-content">
          <h2>Cadastrar Atividade</h2>
          <p>Dados da Atividade</p>
          <button className="popup-link">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
