import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Table from '../../components/Table/Table'; // Importe o componente Table
import styles from './RecursosHumanos.module.css';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nomeDoUsuario = searchParams.get('nome');
    const emailDoUsuario = searchParams.get('email');

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

    return (
        <div>
            <NavBar />

            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
            </div>

            <Table data={dadosDaTabela} /> {/* Passe os dados para o componente Table */}
        </div>
    );
}

export default RecursosHumanos;
