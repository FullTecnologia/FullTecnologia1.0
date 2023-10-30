// useValidationRegister.js

const validateNome = (nome) => {
    if (nome.trim() === '') {
        return 'Campo Nome é obrigatório';
    }
    return '';
};

const validateEmail = (email) => {
    if (!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
        return 'Insira um email válido';
    }
    return '';
};

const validateSenha = (senha) => {
    if (senha.length < 6) {
        return 'A senha deve conter pelo menos 6 caracteres';
    }
    return '';
};

const validateForm = (formData) => {
    const errors = {
        nome: validateNome(formData.nome),
        email: validateEmail(formData.email),
        senha: validateSenha(formData.senha),
    };

    return errors;
};

export { validateForm };
