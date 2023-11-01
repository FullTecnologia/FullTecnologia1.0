import React from 'react';
import './styles.css';

function Popup({ mostrar, fecharPopup }) {
  if (!mostrar) {
    return null;
  }

  return (
    <div className="popup-wrapper">
      <div className="popup">
        <div className="popup-close" onClick={fecharPopup}>x</div>
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
