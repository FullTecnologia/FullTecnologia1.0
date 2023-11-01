import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './Planejamento.module.css'; // Importe o arquivo de módulo CSS

const Planejamento = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}> Página do Planejamento</h1>
        </div>
    )
}

export default Planejamento