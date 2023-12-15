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

  if (
    atividade.status !== "iniciado" &&
    atividade.status !== "concluido" &&
    atividade.status !== "finalizado"
  ) {
    errors.status = "Status inválido";
  }

  return errors;
}

function validateUsuario(dadosUsuario) {
  const errors = {};

  if (!dadosUsuario.nome.trim()) {
    errors.nome = "O nome é obrigatório.";
  }

  if (!dadosUsuario.email.trim()) {
    errors.email = "O e-mail é obrigatório.";
  } else if (!isValidEmail(dadosUsuario.email)) {
    errors.email = "Insira um e-mail válido.";
  }

  // Adicione mais validações conforme necessário para outros campos de dados do usuário

  return errors;
}

// Função de validação para os dados da ficha
function validateFicha(dadosFicha) {
  const errors = {};

  if (!dadosFicha.data_nascimento.trim()) {
    errors.data_nascimento = "A data de nascimento é obrigatória.";
  }

  // Adicione mais validações conforme necessário para outros campos de dados da ficha

  return errors;
}
// Função de validação para os dados de habilidades
function validateHabilidades(habilidades) {
  const errors = {};

  if (!habilidades.habilidade.trim()) {
    errors.habilidade = "A habilidade é obrigatória.";
  }

  // Adicione mais validações conforme necessário para outros campos de dados de habilidades

  return errors;
}

export {
  validateForm,
  validateHabilidades,
  isValidDate,
  isValidEmail,
  validateUsuario,
  validateFicha,
};
