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
        errors.responsavel = "Campo obrigatório";
    }

    if (!atividade.descricao) {
        errors.descricao = "Campo obrigatório";
    }

    if (!atividade.dataFim) {
        errors.dataFim = "Campo obrigatório";
    } else if (!isValidDate(atividade.dataFim)) {
        errors.dataFim = "Data inválida";
    }

    if (atividade.status !== 'iniciado' && atividade.status !== 'concluido' && atividade.status !== 'finalizado') {
        errors.status = "Status inválido";
    }

    if (atividade.tipo !== 0 && atividade.tipo !== 1) {
        errors.tipo = "Tipo inválido";
    }

    return errors;
}

export { validateForm };
