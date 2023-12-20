import React, { useState } from 'react';
import styles from './modalEdit.module.css';

const ModalEditColab = ({ colaborador, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...colaborador });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};

        // Verifique se o nome está preenchido corretamente
        if (!formData.nome) {
            errors.nome = "Nome é obrigatório.";
        }

        // Verifique se o email está preenchido corretamente
        if (!formData.email) {
            errors.email = "Email é obrigatório.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
            errors.email = "Email inválido.";
        }

        // Verifique se não há erros e, em caso afirmativo, salve os dados
        if (Object.keys(errors).length === 0) {
            onSave(formData);
        } else {
            setValidationErrors(errors);
        }
    };

    if (!colaborador) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Editar Colaborador</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalContent}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={validationErrors.nome ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.nome}</span>


                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={validationErrors.email ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.email}</span>

                    <label htmlFor="nivel">Nível</label>
                    <select
                        id="nivel"
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um nível</option>
                        <option value="1">Nível 1</option>
                        <option value="2">Nível 2</option>
                        <option value="3">Nível 3</option>
                        {/* Adicionar mais opções conforme necessário */}
                    </select>
                    <span className={styles.error}>{validationErrors.nivel}</span>

                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ModalEditColab;
