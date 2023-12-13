import AtividadeProgramada from "../../models/atividadeProgramada.js";
import Usuario from "../../models/usuario.js";

async function cadastrarAtividade(req, res) {
  try {
    const { responsavel, descricao, dataFim, status, tipo } = req.body;
    const { id } = req.params;

    console.log(req.body, id);
    // Verifique se req.user está definido
    if (!responsavel) {
      return res.status(400).json({ mensagem: "Usuário não existe." });
    }

    const id_responsavel = await Usuario.findAll({
      where: { nome: responsavel },
    });

    if (!id_responsavel) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    if (!dataFim || !status) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios ausentes." });
    }

    // Busca o usuário no banco de dados pelo ID
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não autentificado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel > 1) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Insere os dados da atividade no banco de dados
    const atividade = await AtividadeProgramada.create({
      id_usuario: id,
      descricao,
      dataFim,
      status,
      tipo,
    });

    // Retorna a atividade cadastrada
    return res.status(201).json(atividade);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar atividade." });
  }
}

async function editarAtividade(req, res) {
  try {
    const { id } = req.params;
    const { dadosAtividade } = req.body;

    const usuario = await Usuario.findByPk(req.body.id_usuario);
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 3) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Verifique se a atividade existe
    const atividade = await AtividadeProgramada.findByPk(id);

    if (!atividade) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }

    // Atualize os dados da atividade
    await atividade.update(dadosAtividade);

    // Retorna a atividade atualizada
    return res.status(200).json(atividade);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao atualizar atividade." });
  }
}

async function excluirAtividade(req, res) {
  try {
    const { id } = req.params;
    const { dadosAtividade } = req.body;

    const usuario = await Usuario.findByPk(req.body.id_usuario);
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 3) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    // Verifique se a atividade existe
    const atividade = await AtividadeProgramada.findByPk(id);

    if (!atividade) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }

    // Exclua a atividade
    await atividade.destroy();

    // Retorna uma mensagem de sucesso
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao excluir atividade." });
  }
}

async function listarAtividades(req, res) {
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

    // Consulte todas as atividades programadas para o usuário específico
    const atividades = await AtividadeProgramada.findAll({
      where: conditions,
    });

    // Retorna a lista de atividades do usuário
    return res.status(200).json(atividades);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensagem: "Erro ao listar atividades do usuário." });
  }
}

export {
  cadastrarAtividade,
  editarAtividade,
  excluirAtividade,
  listarAtividades,
};
