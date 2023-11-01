import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './Diretoria.module.css'; // Importe o arquivo de módulo CSS

const Diretoria = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}>Página da Diretoria</h1>
        </div>
    )
}

export default Diretoria