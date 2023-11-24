import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Table.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchDataFromAtividades } from '../../hooks/apiService';


const Table = () => {
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const atividadesData = await fetchDataFromAtividades();
            setAtividades(atividadesData);
        };

        fetchData();
    }, []);

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Responsável</th>
                        <th>Descrição</th>
                        <th>Data-Fim</th>
                        <th>Status</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade) => (
                        <tr key={atividade.id} className={styles.row}>
                            <td>{atividade.titulo}</td>
                            <td>{atividade.responsavel}</td>
                            <td>{atividade.descricao}</td>
                            <td>{atividade.dataFim}</td>
                            <td>{atividade.status}</td>
                            <td>{atividade.tipo}</td>
                        </tr>
                    ))}
                    <tr className={styles.row}>
                        <td>Exemplo 1</td>
                        <td>João</td>
                        <td>Fazer relatório</td>
                        <td>2023-11-15</td>
                        <td>Em andamento</td>
                        <td>Trabalho</td>
                    </tr>
                    <tr className={styles.row}>
                        <td>Exemplo 2</td>
                        <td>Maria</td>
                        <td>Reunião de equipe</td>
                        <td>2023-11-20</td>
                        <td>Pendente</td>
                        <td>Reunião</td>
                    </tr>
                    <tr className={styles.row}>
                        <td>Exemplo 3</td>
                        <td>Carlos</td>
                        <td>Entregar projeto</td>
                        <td>2023-11-25</td>
                        <td>Concluído</td>
                        <td>Projeto</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const Colab = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        // Função para buscar os dados dos colaboradores do banco de dados
        const fetchDataFromDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/cadastrarFicha'); // Substitua pela rota correta

                if (response.status === 200) {
                    setColaboradores(response.data);
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

    const handleSearch = () => {
        // Filtra os colaboradores com base no nome
        const filteredColaboradores = colaboradores.filter((colaborador) => {
            // Transforma o nome e a pesquisa em letras minúsculas para comparar sem diferenciação de maiúsculas e minúsculas
            const nomeColaborador = colaborador.nome.toLowerCase();
            const nomePesquisa = searchName.toLowerCase();

            // Verifica se o nome do colaborador contém a pesquisa
            return nomeColaborador.includes(nomePesquisa);
        });

        // Atualiza a lista de colaboradores com o resultado da pesquisa
        setColaboradores(filteredColaboradores);
    };

    return (
        <div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    id="searchBar"
                    placeholder='Digite o nome do colaborador'
                    value={searchName}
                    className='tamanho-barra'
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Pesquisar
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Email</th>
                        <th>Data-Nascimento</th>
                        <th>CPF</th>
                        <th>PIS</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.map((colaborador) => (
                        <tr key={colaborador.id} className={styles.row}>
                            <td>{colaborador.nome}</td>
                            <td>{colaborador.cargo}</td>
                            <td>{colaborador.email}</td>
                            <td>{colaborador.dataNascimento}</td>
                            <td>{colaborador.cpf}</td>
                            <td>{colaborador.pis}</td>
                            <td>
                                <button className={styles.editButton}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                    {/* Adicione o ícone de lápis aqui */}
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr className={styles.row}>
                        <td>Colaborador</td>
                        <td>Analista</td>
                        <td>exemplo@empresa.com</td>
                        <td>1990-05-15</td>
                        <td>123.456.789-00</td>
                        <td>12345678900</td>
                        <td>
                            <button className={styles.editIcon}>
                                <span className={styles.editIcon}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

};

export { Table, Colab };
