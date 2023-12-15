import React, { useState, useEffect } from 'react';
import styles from './modalEdit.module.css';

import { formatData } from '../../utils/utils';

const ModalEdit = ({ atividade, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...atividade });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        setFormData({
            ...atividade,
            dataFim: atividade.dataFim ? formatData(atividade.dataFim) : ''
        });
    }, [atividade]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function isValidDate(dateString) {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;
        const d = new Date(dateString);
        if (!d.getTime() || isNaN(d.getTime())) return false;
        return d.toISOString().slice(0, 10) === dateString;
    }


    function validateForm(atividade) {
        const errors = {};

        if (!atividade.responsavel) {
            errors.responsavel = "Campo obrigatório.";
        }

        if (!atividade.descricao) {
            errors.descricao = "Campo obrigatório.";
        }

        if (!atividade.dataFim) {
            errors.dataFim = "Campo obrigatório.";
        } else if (!isValidDate(atividade.dataFim)) {
            errors.dataFim = "Data inválida";
        }

        if (
            atividade.status !== "iniciado" &&
            atividade.status !== "concluido" &&
            atividade.status !== "finalizado"
        ) {
            errors.status = "Status inválido";
        }

        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Verifica se validateForm é uma função antes de chamá-la
        if (typeof validateForm === 'function') {
            const errors = validateForm(formData);
            if (Object.keys(errors).length === 0) {
                onSave(formData);
            } else {
                setValidationErrors(errors);
            }
        } else {
            console.error('validateForm is not a function');
            // Você pode optar por lidar com este erro de maneira diferente, se necessário
        }
    };


    if (!atividade) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Editar Atividade</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalContent}>
                    <label htmlFor="responsavel">Responsável</label>
                    <input
                        type="text"
                        id="responsavel"
                        name="responsavel"
                        value={formData.responsavel}
                        onChange={handleChange}
                        className={validationErrors.responsavel ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.responsavel}</span>

                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        className={validationErrors.descricao ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.descricao}</span>

                    <label htmlFor="dataFim">Data de Fim</label>
                    <input
                        type="date"
                        id="dataFim"
                        name="dataFim"
                        value={formData.dataFim}
                        onChange={handleChange}
                        className={validationErrors.dataFim ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.dataFim}</span>

                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={validationErrors.status ? styles.errorInput : ''}
                    >
                        <option value="iniciado">Iniciado</option>
                        <option value="concluido">Concluído</option>
                        <option value="finalizado">Finalizado</option>
                    </select>
                    <span className={styles.error}>{validationErrors.status}</span>

                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className={validationErrors.tipo ? styles.errorInput : ''}
                    >
                        <option value="0">Não Prioritário</option>
                        <option value="1">Prioritário</option>
                    </select>
                    <span className={styles.error}>{validationErrors.tipo}</span>

                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdit;
