import React, { useState, useEffect } from 'react';
import styles from './Table.module.css'; // Importe seu arquivo CSS
import axios from 'axios';

const Table = () => {
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {
        // Função para buscar os dados do banco de dados
        const fetchDataFromDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/sua-rota-aqui'); // Substitua pela rota correta

                if (response.status === 200) {
                    setAtividades(response.data);
                } else {
                    console.error('Erro ao buscar dados do banco de dados.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do banco de dados:', error);
            }
        };

        // Chama a função para buscar os dados ao carregar o componente
        fetchDataFromDatabase();
    }, []);

    return (
        <div>
            <h1 className={styles.textTable}>Tabela de Atividades</h1>
            <table className={styles.centeredTable}> {/* Aplicando as classes CSS */}
                <thead className={styles.table}>
                    <tr>
                        <th>ID</th>
                        <th>Nome da Atividade</th>
                        <th>Data</th>
                        {/* Adicione mais colunas conforme necessário */}
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade) => (
                        <tr key={atividade.id}>
                            <td>{atividade.id}</td>
                            <td>{atividade.nome_atividade}</td>
                            <td>{atividade.data_atividade}</td>
                            {/* Adicione mais colunas conforme necessário */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Table;
