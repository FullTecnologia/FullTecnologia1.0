// RecursosHumanos.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../../components/Table/Table';
import styles from './RecursosHumanos.module.css';
import NavBar from '../../components/NavBar/NavBar';
import '../../components/Popup/style.css';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    function showModal() {
        var element = document.getElementById("modal");
        element.classList.add("show-modal");
    }

    function closeModal() {
        var element = document.getElementById("modal");
        element.classList.remove("show-modal");
    }

    return (
        <div>
            <NavBar />
            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
                <div>
                    <button className="trigger" onClick={showModal}>Cadastrar Atividade</button>
                    <div className="modal" id="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={closeModal}>
                                &times;
                            </span>
                            <h1>Cadastrar Atividade</h1>
                        </div>
                    </div>
                </div>

                <Table data={dadosDaTabela} />
            </div>
        </div>
    );
}

export default RecursosHumanos;
