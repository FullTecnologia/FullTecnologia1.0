import React, { useState, useEffect } from 'react';

//import em icones 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faTrashAlt,
    faBookOpen
} from '@fortawesome/free-solid-svg-icons';

//hooks
import {
    dataAtividades,
    editarAtividade,
    excluirAtividade,
    listarColaboradores,
    listarFicha,
    editarColaborador,
    excluirColaborador
} from '../../hooks/apiService';

//contexts
import { useAuthState } from "../../contexts/AuthContext";

//components
import ModalEdit from '../Popup/modalEdit';
import ModalEditColab from '../Popup/modalEditColab';
import ModalFicha from '../Popup/modalFicha';

//css
import styles from './Table.module.css';

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
    const [filteredColaboradores, setFilteredColaboradores] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentColaborador, setCurrentColaborador] = useState(null);
    const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
    const [currentFicha, setCurrentFicha] = useState(null);

    const fetchDataFromDatabase = async () => {
        try {
            const dados = await listarColaboradores();
            setColaboradores(dados);
        } catch (error) {
            console.error('Erro ao buscar dados dos colaboradores:', error);
        }
    };

    useEffect(() => {
        fetchDataFromDatabase();
    }, []);

    useEffect(() => {
        setFilteredColaboradores(colaboradores);
    }, [colaboradores]);

    const openModal = (colaborador) => {
        setCurrentColaborador(colaborador);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentColaborador(null);
    };

    const openDetalhesModal = async (colaborador) => {
        setCurrentColaborador(colaborador);

        try {
            const fichaData = await listarFicha(colaborador.id);
            if (fichaData && fichaData.length > 0) {
                setCurrentFicha(fichaData[0]);
            }
        } catch (error) {
            console.error('Erro ao buscar ficha do colaborador:', error);
            setCurrentFicha(null);
        }

        setIsDetalhesModalOpen(true);
    };

    const closeDetalhesModal = () => {
        setIsDetalhesModalOpen(false);
    };

    const handleSave = async (updatedColaborador) => {
        try {
            await editarColaborador(updatedColaborador.id, updatedColaborador);
            fetchDataFromDatabase(); // Para atualizar a lista de colaboradores
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
        }
        closeModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este colaborador?')) {
            try {
                await excluirColaborador(id);
                fetchDataFromDatabase(); // Para atualizar a lista de colaboradores
            } catch (error) {
                console.error('Erro ao excluir colaborador:', error);
            }
        }
    };

    const handleSearch = () => {
        const filtered = colaboradores.filter(colaborador =>
            colaborador.nome.toLowerCase().includes(searchName.toLowerCase())
        );
        setFilteredColaboradores(filtered);
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
                        <th>Email</th>
                        <th>Nível</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColaboradores.map(colaborador => (
                        <tr key={colaborador.id} className={styles.row}>
                            <td>{colaborador.nome}</td>
                            <td>{colaborador.email}</td>
                            <td>{colaborador.nivel}</td>
                            <td>
                                <button onClick={() => openModal(colaborador)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                            </td>
                            <td>
                                <button className={styles.deleteButton} onClick={() => handleDelete(colaborador.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                            <td>
                                <button className={styles.detailsButton} onClick={() => openDetalhesModal(colaborador)}>
                                    <FontAwesomeIcon icon={faBookOpen} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEditColab
                    colaborador={currentColaborador}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}

            {isDetalhesModalOpen && (
                <ModalFicha
                    ficha={currentFicha}
                    onClose={closeDetalhesModal}
                    onUpdate={fetchDataFromDatabase}
                />
            )}
        </div>
    );
};

export default Table;
export { Colab };
