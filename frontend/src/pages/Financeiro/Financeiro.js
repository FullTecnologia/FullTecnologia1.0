import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './Financeiro.module.css'; // Importe o arquivo de módulo CSS

const Financeiro = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}>Página do Financeiro</h1>
        </div>
    )
}

export default Financeiro