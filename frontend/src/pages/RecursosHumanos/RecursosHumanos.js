import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Table from '../../components/Table/Table'; // Importe o componente Table
import styles from './RecursosHumanos.module.css';
import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './RecursosHumanos.module.css'; // Importe o arquivo de módulo CSS
import Popup from '../../components/Popup/Popup';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Dados fictícios (substitua por dados reais do banco de dados)
    const dadosDaTabela = [
        { id: 1, nome: 'Atividade 1', data: '2023-11-01' },
        { id: 2, nome: 'Atividade 2', data: '2023-11-02' },
        // Adicione mais dados conforme necessário
    ];

    useEffect(() => {
        console.log('Nome do Usuário:', nomeDoUsuario);
        console.log('Email do Usuário:', emailDoUsuario);
    }, [nomeDoUsuario, emailDoUsuario]);
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

            <Table data={dadosDaTabela} /> {/* Passe os dados para o componente Table */}
        </div>
    );
}

export default RecursosHumanos;
