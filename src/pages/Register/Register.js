import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

import { validateForm } from '../../hooks/useValidationRegister'; // Importe as funções de validação

function Register() {
    const navigate = useNavigate();

    const initialErrors = {
        nome: '',
        email: '',
        senha: '',
    };

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        nivel: '',
    });

    const [errors, setErrors] = useState(initialErrors);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.values(validationErrors).every((error) => error === '')) {
            try {
                // Restaurar os erros para o estado inicial
                setErrors(initialErrors);

                const response = await fetch('http://localhost:3003/api/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response) {
                    console.log('Cadastro bem-sucedido!');
                    navigate('/'); // Use navigate para redirecionar
                } else {
                    console.error('Erro de cadastro.');
                }
            } catch (error) {
                console.error('Erro ao enviar solicitação de cadastro:', error);
            }
        } else {
            // Atualizar os erros no estado
            setErrors(validationErrors);
            console.error('Formulário inválido. Corrija os erros antes de enviar.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formBox}> {/* Adicione a classe 'form-box' aqui */}
                    <h2>Cadastro</h2>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                    />
                    {errors.nome && <p className={styles.error}>{errors.nome}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        required
                    />
                    {errors.senha && <p className={styles.error}>{errors.senha}</p>}

                    <input
                        type="text"
                        placeholder="Nível"
                        value={formData.nivel}
                        onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                    />
                    <button type="submit" onClick={handleSubmit}>Cadastrar</button>
                </div>

            </form>
        </div>
    );
}

export default Register;
