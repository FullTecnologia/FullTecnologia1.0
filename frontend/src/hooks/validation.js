function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    if (!d.getTime() || isNaN(d.getTime())) return false;
    return d.toISOString().slice(0, 10) === dateString;
}

function isValidEmail(email) {
    // Expressão regular para verificar o formato do e-mail
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Verifique se o e-mail corresponde à expressão regular
    return emailRegex.test(email);
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

    if (atividade.status !== 'iniciado' && atividade.status !== 'concluido' && atividade.status !== 'finalizado') {
        errors.status = "Status inválido";
    }

    if (atividade.tipo !== 0 && atividade.tipo !== 1) {
        errors.tipo = "Tipo inválido.";
    }

    return errors;
}

function validateColaborador(colaborador) {
    const errors = {};
    const usuario = colaborador.usuario;

    if (!usuario.nome) {
        errors.nome = "Campo obrigatório.";
    }

    if (!usuario.email) {
        errors.email = "Campo obrigatório.";
    } else if (!isValidEmail(usuario.email)) {
        errors.email = "E-mail inválido.";
    }

    if (!usuario.senha) {
        errors.senha = "Campo obrigatório.";
    } else if (usuario.senha.length < 6) {
        errors.senha = "A senha deve conter pelo menos 6 caracteres.";
    }

    if (usuario.nivel !== 0 && usuario.nivel !== 1) {
        errors.nivel = "Nível inválido.";
    }

    // Adicione mais validações conforme necessário para os campos de ficha e habilidades

    return errors;
}

export { validateForm, validateColaborador };