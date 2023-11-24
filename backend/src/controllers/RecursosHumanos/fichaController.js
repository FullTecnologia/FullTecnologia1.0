import Ficha from "../../models/ficha.js";
import Usuario from "../../models/usuario.js";
import Habilidade from "../../models/habilidade.js";

async function cadastrarFicha(req, res) {
  try {
    const {
      id_usuario,
      data_nascimento,
      naturalidade,
      nome_mae,
      nome_pai,
      cpf,
      carteira_identidade,
      expeditor_identidade,
      data_emissao_identidade,
      titulo_eleitor_numero,
      titulo_eleitor_zona,
      titulo_eleitor_secao,
      ctps_numero,
      ctps_serie,
      ctps_uf,
      ctps_data_emissao,
      pis_numero,
      pis_data_cadastro,
      carteira_habilitacao_numero,
      carteira_habilitacao_categoria,
      estado_civil,
      escolaridade,
      raca_cor,
      certificado_reservista_numero,
      certificado_reservista_categoria,
      nome_companheiro,
      endereco,
      endereco_numero,
      endereco_cep,
      endereco_complemento,
      endereco_cidade,
      endereco_bairro,
      endereco_uf,
      cargo,
      cbo,
      data_admissao,
      salario,
      contrato_experiencia,
      horario_trabalho,
      intervalo,
      descanso,
      horario_sabado,
      vale_transporte,
      informacoes_complementares,
    } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 1) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Insere os dados da ficha no banco de dados
    const ficha = await Ficha.create({
      id_usuario,
      data_nascimento,
      naturalidade,
      nome_mae,
      nome_pai,
      cpf,
      carteira_identidade,
      expeditor_identidade,
      data_emissao_identidade,
      titulo_eleitor_numero,
      titulo_eleitor_zona,
      titulo_eleitor_secao,
      ctps_numero,
      ctps_serie,
      ctps_uf,
      ctps_data_emissao,
      pis_numero,
      pis_data_cadastro,
      carteira_habilitacao_numero,
      carteira_habilitacao_categoria,
      estado_civil,
      escolaridade,
      raca_cor,
      certificado_reservista_numero,
      certificado_reservista_categoria,
      nome_companheiro,
      endereco,
      endereco_numero,
      endereco_cep,
      endereco_complemento,
      endereco_cidade,
      endereco_bairro,
      endereco_uf,
      cargo,
      cbo,
      data_admissao,
      salario,
      contrato_experiencia,
      horario_trabalho,
      intervalo,
      descanso,
      horario_sabado,
      vale_transporte,
      informacoes_complementares,
    });

    // Retorna a ficha cadastrada
    return ficha;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar ficha." });
  }
}

async function editarFicha(req, res) {
  try {
    const { id } = req.params; // Obtém o ID da ficha a ser editada
    const { dadosFicha } = req.body;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 1) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Encontra a ficha pelo ID
    const ficha = await Ficha.findAll({ where: { id_usuario: id } });

    if (!ficha) {
      return res.status(404).json({ mensagem: "Ficha não encontrada." });
    }

    // Atualiza os dados da ficha com base nos dados fornecidos
    await ficha.update(dadosFicha);

    // Retorna a ficha atualizada
    return res
      .status(200)
      .json({ mensagem: "Ficha atualizada com sucesso.", ficha });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao editar ficha." });
  }
}

async function excluirFicha(req, res) {
  try {
    const { id } = req.params; // Obtém o ID da ficha a ser excluída
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 1) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Encontra a ficha pelo ID
    const ficha = await Ficha.findAll({ where: { id_usuario: id } });

    if (!ficha) {
      return res.status(404).json({ mensagem: "Ficha não encontrada." });
    }

    // Exclui a ficha
    await ficha.destroy();

    return res.status(200).json({ mensagem: "Ficha excluída com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao excluir ficha." });
  }
}

async function listagem(req, res) {
  try {
    const { id } = req.params;
    const { dataInicio, dataFim, termoBusca } = req.query;

    // Construa as condições de pesquisa com base nos filtros de data e termo de busca
    const conditions = { id_usuario: id };
    if (dataInicio && dataFim) {
      conditions.data_atividade = { [Op.between]: [dataInicio, dataFim] };
    }
    if (termoBusca) {
      conditions.nome_atividade = { [Op.like]: `%${termoBusca}%` };
    }
    console.log(conditions);
    // Consulta SQL para buscar um usuário específico com suas fichas e habilidades
    const usuario = await Ficha.findAll({ where: conditions });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar fichas." });
  }
}

export { cadastrarFicha, editarFicha, excluirFicha, listagem };
