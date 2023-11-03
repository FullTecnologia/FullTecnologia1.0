import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './RecursosHumanos.module.css'; // Importe o arquivo de módulo CSS
import Popup from '../../components/Popup/Popup';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [mostrarPopup, setMostrarPopup] = useState(false); // Adicione este estado

    const abrirPopup = () => {
        setMostrarPopup(true);
    };

    const fecharPopup = () => {
        setMostrarPopup(false);
    };

    return (
        <div>
            <NavBar />
            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
                <div>
                    <button onClick={abrirPopup}>
                        Cadastrar Atividade
                    </button>
                    {<Popup mostrar={abrirPopup} />}
                </div>
            </div>
        </div>
    );
}

export default RecursosHumanos;
