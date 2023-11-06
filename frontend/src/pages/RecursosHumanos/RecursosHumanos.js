import React, { useState } from 'react';
import { Table, Colab } from '../../components/Table/Table';
import NavBar from '../../components/NavBar/NavBar';
import { validateForm } from '../../hooks/validation';
import { useLocation } from 'react-router-dom';
import '../../components/Popup/style.css';
import styles from './RecursosHumanos.module.css';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [atividade, setAtividade] = useState({
        responsavel: '',
        descricao: '',
        dataFim: '',
        status: 'iniciado',
        tipo: 0,
    });

    const [validationErrors, setValidationErrors] = useState({});

    const [colaborador, setColaborador] = useState({
        nome: '',
        email: '',
        senha: '',
        nivel: 0,
    });

    function showModal() {
        var element = document.getElementById("modal");
        element.classList.add("show-modal");
    }

    function closeModal() {
        var element = document.getElementById("modal");
        element.classList.remove("show-modal");

        setAtividade({
            responsavel: '',
            descricao: '',
            dataFim: '',
            status: 'iniciado',
            tipo: 0,
        });

        setValidationErrors({});
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setAtividade({
            ...atividade,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const errors = validateForm(atividade);

        if (Object.keys(errors).length === 0) {
            fetch("/cadastrarAtividade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(atividade),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erro na solicitação");
                    }
                })
                .then((data) => {
                    console.log(data);
                    closeModal();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setValidationErrors(errors);
        }
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="responsavel">Responsável:</label>
                    <input
                        type="text"
                        id="responsavel"
                        name="responsavel"
                        value={atividade.responsavel}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <span className="error">{validationErrors.responsavel}</span>
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={atividade.descricao}
                        onChange={handleInputChange}
                    />
                    <span className="error">{validationErrors.descricao}</span>
                </div>
                <div>
                    <label htmlFor="dataFim">Data de Fim:</label>
                    <input
                        type="date"
                        id="dataFim"
                        name="dataFim"
                        value={atividade.dataFim}
                        onChange={handleInputChange}
                    />
                    <span className="error">{validationErrors.dataFim}</span>
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={atividade.status}
                        onChange={handleInputChange}
                    >
                        <option value="iniciado">Iniciado</option>
                        <option value="concluido">Concluído</option>
                        <option value="finalizado">Finalizado</option>
                    </select>
                    <span className="error">{validationErrors.status}</span>
                </div>
                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={atividade.tipo}
                        onChange={handleInputChange}
                    >
                        <option value="0">Não Prioritário</option>
                        <option value="1">Prioritário</option>
                    </select>
                    <span className="error">{validationErrors.tipo}</span>
                </div>
                <div>
                    <button type="submit" className="submit-button">Cadastrar</button>
                </div>
            </form>
        );
    }

    function handleColaboradorInputChange(event) {
        const { name, value } = event.target;
        setColaborador({
            ...colaborador,
            [name]: value,
        });
    }

    function handleColaboradorSubmit(event) {
        event.preventDefault();
        const errors = validateForm(colaborador);

        if (Object.keys(errors).length === 0) {
            fetch("/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(colaborador),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Erro na solicitação");
                    }
                })
                .then((data) => {
                    console.log(data);
                    closeModal("modalColaborador", setColaborador);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setValidationErrors(errors);
        }
    }

    function renderColaboradorForm() {
        return (
            <form onSubmit={handleColaboradorSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={colaborador.nome}
                        onChange={handleColaboradorInputChange}
                    />
                    <span className="error">{validationErrors.nome}</span>
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={colaborador.email}
                        onChange={handleColaboradorInputChange}
                    />
                    <span className="error">{validationErrors.email}</span>
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={colaborador.senha}
                        onChange={handleColaboradorInputChange}
                    />
                    <span className="error">{validationErrors.senha}</span>
                </div>
                <div>
                    <label htmlFor="nivel">Nível:</label>
                    <select
                        id="nivel"
                        name="nivel"
                        value={colaborador.nivel}
                        onChange={handleColaboradorInputChange}
                    >
                        <option value={0}>Nível 0</option>
                        <option value={1}>Nível 1</option>
                    </select>
                    <span className="error">{validationErrors.nivel}</span>
                </div>
                <div>
                    <button type="submit" className="submit-button">Cadastrar</button>
                </div>
            </form>
        );
    }

    return (
        <div>
            <NavBar />
            <div className={styles.bodyRecursos}>
                <div>
                    <button className="trigger" onClick={showModal}>Cadastrar Atividade</button>
                    <div className="modal" id="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={closeModal}>
                                &times;
                            </span>
                            <h1>Cadastrar Atividade</h1>
                            {renderForm()}
                        </div>
                    </div>
                    <button className="trigger" onClick={showModal}>Cadastrar Colaborador</button>
                    <div className="modal" id="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={closeModal}>
                                &times;
                            </span>
                            <h1>Cadastrar Colaborador</h1>
                            {renderColaboradorForm()}
                        </div>
                    </div>
                </div>
                <div>
                    <Table />
                    <Colab />
                </div>
            </div>
        </div>
    );
}

export default RecursosHumanos;
