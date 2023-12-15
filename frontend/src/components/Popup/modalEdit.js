import React, { useState, useEffect } from 'react';
import styles from './modalEdit.module.css';

import { formatData } from '../../utils/utils';

const ModalEdit = ({ atividade, onClose, onSave, validateForm }) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            onSave(formData);
        } else {
            setValidationErrors(errors);
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
