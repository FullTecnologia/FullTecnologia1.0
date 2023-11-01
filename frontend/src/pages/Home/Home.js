import React from 'react'

import NavBar from '../../components/NavBar/NavBar'; // Importe a NavBar

import styles from './Home.module.css'; // Importe o arquivo de módulo CSS

const Home = () => {
    return (
        <div>
            <NavBar />

            <h1 className={styles.bodyRecursos}>Página do Home</h1>
        </div>
    )
}

export default Home 