import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar
import styles from './Comercial.module.css'; // Importe o arquivo de módulo CSS

const Comercial = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}>Página do Comercial</h1>
        </div>
    )
}

export default Comercial