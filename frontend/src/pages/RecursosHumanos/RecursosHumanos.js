// RecursosHumanos.js
import React from 'react';
import styles from './RecursosHumanos.module.css';
import NavBar from '../../components/NavBar/NavBar';
import Table from '../../components/Table/Table';

function RecursosHumanos() {
    return (
        <div>
            <NavBar />
            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
            </div>

            <Table />
        </div>
    );
}

export default RecursosHumanos;
