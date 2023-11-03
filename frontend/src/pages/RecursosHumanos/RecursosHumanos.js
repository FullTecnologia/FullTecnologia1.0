// RecursosHumanos.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../../components/Table/Table';
import styles from './RecursosHumanos.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { validateForm } from '../../hooks/validation';
import '../../components/Popup/style.css';

function RecursosHumanos() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Dados fictícios (substitua por dados reais do banco de dados)
    const dadosDaTabela = [
        { id: 1, nome: 'Atividade 1', data: '2023-11-01' },
        { id: 2, nome: 'Atividade 2', data: '2023-11-02' },
        // Adicione mais dados conforme necessário
    ];

    const [atividade, setAtividade] = useState({
        responsavel: '',
        descricao: '',
        dataFim: '',
        status: 'iniciado',
        tipo: 0,
    });

    const [validationErrors, setValidationErrors] = useState({});

    function showModal() {
        var element = document.getElementById("modal");
        element.classList.add("show-modal");
    }

    function closeModal() {
        var element = document.getElementById("modal");
        element.classList.remove("show-modal");
    
        // Redefina o estado 'atividade' para valores iniciais
        setAtividade({
            responsavel: '',
            descricao: '',
            dataFim: '',
            status: 'iniciado',
            tipo: 0,
        });
    
        // Limpe quaisquer erros de validação
        setValidationErrors({});
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setAtividade({
            ...atividade,
            [name]: value,
        })
    }   

    function handleSubmit(event) {
        event.preventDefault();
        const errors = validateForm(atividade);
    
        if (Object.keys(errors).length === 0) {
            // Dados do formulário são válidos
            fetch("/cadastrarAtividade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(atividade), // Envia os dados como JSON
            })
                .then((response) => {
                    if (response.ok) {
                        // A solicitação foi bem-sucedida
                        return response.json();
                    } else {
                        // A solicitação falhou
                        throw new Error("Erro na solicitação");
                    }
                })
                .then((data) => {
                    // Os dados de resposta do servidor, se houver
                    console.log(data);
                    closeModal();
                })
                .catch((error) => {
                    // Lidar com erros de solicitação
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

    return (
        <div>
            <NavBar />
            <div className={styles.bodyRecursos}>
                <h2>Recursos Humanos</h2>
                <p>Essa página ficará encarregada do RH</p>
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
                </div>
            </div>

            <Table data={dadosDaTabela} />
        </div>
    );
}

export default RecursosHumanos;
