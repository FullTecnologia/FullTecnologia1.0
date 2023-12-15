import React, { useState, useEffect } from 'react';
import axios from 'axios';

//css
import styles from './Table.module.css';

//import em icones 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

//hooks
import { dataAtividades, editarAtividade, excluirAtividade } from '../../hooks/apiService';

//contexts
import { useAuthState } from "../../contexts/AuthContext";

//components
import ModalEdit from '../Popup/modalEdit';

//utils
import { formatData } from '../../utils/utils';

const Table = ({ userId, dataAtv }) => {
    const [atividades, setAtividades] = useState([]);
    const { nome } = useAuthState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAtividade, setCurrentAtividade] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atividadesData = await dataAtividades(userId);
                setAtividades(atividadesData);
            } catch (error) {
                console.error('Erro ao buscar dados de atividades:', error);
            }
        };

        fetchData();
    }, [userId]);

    const openModal = (atividade) => {
        setCurrentAtividade(atividade);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAtividade(null);
    };

    const handleSave = async (updatedAtividade) => {
        try {
            await editarAtividade(updatedAtividade.id, updatedAtividade);
            const updatedList = atividades.map(ativ =>
                ativ.id === updatedAtividade.id ? { ...ativ, ...updatedAtividade } : ativ);
            setAtividades(updatedList);
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
            try {
                await excluirAtividade(id);
                setAtividades(atividades.filter(ativ => ativ.id !== id));
            } catch (error) {
                console.error('Erro ao excluir atividade:', error);
            }
        }
    };



    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Responsável</th>
                        <th>Descrição</th>
                        <th>Data-Fim</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade) => (
                        <tr key={atividade.id} className={styles.row}>
                            <td>{nome}</td>
                            <td>{atividade.descricao}</td>
                            <td>{formatData(atividade.dataFim)}</td>
                            <td>{atividade.status}</td>
                            <td>
                                <button onClick={() => openModal(atividade)} className={styles.actionButton}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(atividade.id)} className={styles.actionButton}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEdit
                    atividade={currentAtividade}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
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
                const response = await axios.get('http://localhost:3003/api/listarHabilidades/:id'); //tem que ter o :id no final da rota

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

export default Table;
export { Colab };
