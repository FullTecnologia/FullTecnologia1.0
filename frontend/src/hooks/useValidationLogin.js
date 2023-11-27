import { useState } from 'react';

const useValidation = () => {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        if (!email) {
            return 'Insira uma email válido.';
        }

        // Adicione aqui sua lógica de validação de email, por exemplo, uma expressão regular
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return 'Insira um email válido.';
        }

        return '';
    };

    const validateSenha = (senha) => {
        if (!senha) {
            return 'Insira uma senha válida.';
        }

        return '';
    };

    const validateForm = (email, senha) => {
        const emailError = validateEmail(email);
        const senhaError = validateSenha(senha);

        setErrors({
            email: emailError,
            senha: senhaError,
        });

        return !emailError && !senhaError;
    };

    return {
        validateEmail,
        validateSenha,
        validateForm,
        errors,
    };
};

export default useValidation;
