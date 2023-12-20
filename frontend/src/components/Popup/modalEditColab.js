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

        if (!formData.nome.trim()) {
            errors.nome = "Nome é obrigatório.";
        }

        if (!formData.cargo.trim()) {
            errors.cargo = "Cargo é obrigatório.";
        }

        if (!formData.email.trim()) {
            errors.email = "Email é obrigatório.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
            errors.email = "Email inválido.";
        }

        if (!formData.cpf.trim()) {
            errors.cpf = "CPF é obrigatório.";
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/g.test(formData.cpf)) {
            errors.cpf = "CPF inválido.";
        }

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

                    <label htmlFor="cargo">Cargo</label>
                    <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className={validationErrors.cargo ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.cargo}</span>

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

                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        className={validationErrors.cpf ? styles.errorInput : ''}
                    />
                    <span className={styles.error}>{validationErrors.cpf}</span>

                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditColab;
