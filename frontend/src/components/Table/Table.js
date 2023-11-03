import React from 'react';
import styles from './Table.module.css'; // Importe as classes CSS do arquivo separado

const Table = ({ data }) => {
    return (
        <div>
            <h3 className={styles.title}>Tabela de Atividades Programadas</h3>
            <table className={styles.tableContainer}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>Título</th>
                        <th className={styles.tableHeader}>Responsável</th>
                        <th className={styles.tableHeader}>Descrição</th>
                        <th className={styles.tableHeader}>Data-Fim</th>
                        <th className={styles.tableHeader}>Status</th>
                        <th className={styles.tableHeader}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td className={styles.tableCell}>{item.titulo}</td>
                            <td className={styles.tableCell}>{item.responsavel}</td>
                            <td className={styles.tableCell}>{item.descricao}</td>
                            <td className={styles.tableCell}>{item.dataFim}</td>
                            <td className={styles.tableCell}>{item.status}</td>
                            <td className={styles.tableCell}>{item.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
