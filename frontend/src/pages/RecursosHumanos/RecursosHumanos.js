import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './RecursosHumanos.module.css'; // Importe o arquivo de módulo CSS
import Popup from '../../components/Popup'

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nomeDoUsuario = searchParams.get('nome');
    const emailDoUsuario = searchParams.get('email');

    const [mostrarPopup, setMostrarPopup] = useState(false);

    useEffect(() => {
        console.log('Nome do Usuário:', nomeDoUsuario);
        console.log('Email do Usuário:', emailDoUsuario);
    }, [nomeDoUsuario, emailDoUsuario]);

    const abrirPopup = () => {
        setMostrarPopup(true); 
    };

    const fecharPopup = () => {
        setMostrarPopup(false);
    };

    return (
        <div>
            <NavBar /> {/* Renderize a NavBar sem passar informações de usuário */}
            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
            </div>
            <div className={styles.bodyRecursos}>
                <button onClick={abrirPopup}>Cadastrar Atividades</button>
                <Popup mostrar={mostrarPopup} fecharPopup={fecharPopup} />
            </div>
        </div>
    );
}

export default RecursosHumanos;
