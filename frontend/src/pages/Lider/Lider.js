import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './Lider.module.css'; // Importe o arquivo de módulo CSS


const Lider = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}>Página do Líder</h1>

        </div>
    )
}

export default Lider