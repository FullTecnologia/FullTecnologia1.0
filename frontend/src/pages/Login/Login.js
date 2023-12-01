import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useValidationLogin from '../../hooks/useValidationLogin'; // Importe o hook de validação
import { useAuth } from '../../contexts/AuthContext';

import styles from './Login.module.css'; // Importe o arquivo de módulo CSS
import LogoImage from '../../assets/Logo-Full-Engenharia.png'; // Importe a imagem diretamente

const Login = () => {
    const { dispatch } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const { validateEmail, validateSenha } = useValidationLogin(); // Importe as funções de validação
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail)); // Validação do email
    };

    const handleSenhaChange = (event) => {
        const newSenha = event.target.value;
        setSenha(newSenha);
        setSenhaError(validateSenha(newSenha)); // Validação da senha
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!emailError && !senhaError) {
            try {
                // Enviar informações de login para o servidor
                const response = await axios.post('http://localhost:3003/api/login', {
                    email,
                    senha,
                });

                console.log("Dados do response:", response.data);

                // Se o login for bem-sucedido, despache a ação de LOGIN
                if (response) {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user: response.data, // ou ajuste para a propriedade correta no seu objeto de resposta
                            token: response.data.token,
                            login: response.data.login,
                        },
                    });

                    // Redirecione para a página de Recursos Humanos com as informações do usuário como parâmetros na URL
                    navigate(`/recursoshumanos`);
                } else {
                    console.error('Erro durante o login.');
                }
            } catch (error) {
                console.error('Erro ao enviar solicitação de login:', error);
            }
        } else {
            console.error('Dados inválidos. Corrija os erros antes de fazer o login.');
        }
    };




    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <img src={LogoImage} alt="Logo da Empresa" className={styles.logoImage} />
                <form onSubmit={handleLogin} className={styles.retanguleForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.labelText}>E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Digite o seu email'
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className={styles.inputField}
                        />
                        {emailError && <p className={styles.errorText}>{emailError}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.labelText}>Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder='Digite sua senha'
                            value={senha}
                            onChange={handleSenhaChange}
                            required
                            className={styles.inputField}
                        />
                        {senhaError && <p className={styles.errorText}>{senhaError}</p>}
                    </div>
                    <div>
                        <button type="submit" className={styles.loginButton} onClick={handleLogin}>
                            Acessar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};


export default Login;
