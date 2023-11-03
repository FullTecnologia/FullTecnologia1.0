import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../../components/Table/Table'; // Importe o componente Table
import styles from './RecursosHumanos.module.css';
import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import '../../components/Popup/styles.css';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Dados fictícios (substitua por dados reais do banco de dados)
    const dadosDaTabela = [
        { id: 1, nome: 'Atividade 1', data: '2023-11-01' },
        { id: 2, nome: 'Atividade 2', data: '2023-11-02' },
        // Adicione mais dados conforme necessário
    ];

    const [mostrarPopup, setMostrarPopup] = useState(false); // Adicione este estado

    const abrirPopup = () => {
        setMostrarPopup(true);
    };

    const fecharPopup = () => {
        setMostrarPopup(false);
    };

    const renderizarPopup = () => {
        if (!mostrarPopup) {
            return null;
        }

        return (
            <div className="popup-wrapper">
                <div className="popup">
                    <div className="popup-close" onClick={fecharPopup}>x</div>
                    <div className="popup-content">
                        <h2>Cadastrar Atividade</h2>
                        <p>Dados da Atividade</p>
                        <button className="popup-link" onClick={fecharPopup}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        );
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
                    {renderizarPopup}
                </div>
            </div>

            <Table data={dadosDaTabela} /> {/* Passe os dados para o componente Table */}
        </div>
    );
}

export default RecursosHumanos;
