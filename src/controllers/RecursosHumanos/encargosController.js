import EncargosObrigacoes from "../../models/encargosObrigacoes";

// Função para cadastrar um novo encargo/obrigação
async function cadastrarEncargo(req, res) {
  try {
    const nivelUsuario = req.user.nivel;

    // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
    if (nivelUsuario < 3) {
        return res.status(403).json({ mensagem: "Permissão negada." });
    }

    const novoEncargo = await EncargosObrigacoes.create(req.body); 
    return res.status(201).json(novoEncargo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar o encargo" });
  }
}

// Função para editar um encargo/obrigação existente
async function editarEncargo(req, res) {
  try {
    const encargoId = req.params.id; // Supondo que o ID do encargo seja passado como um parâmetro na rota
    const nivelUsuario = req.user.nivel;

    // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
    if (nivelUsuario < 3) {
       return res.status(403).json({ mensagem: "Permissão negada." });
    }

    const encargo = await EncargosObrigacoes.findByPk(encargoId);
    if (!encargo) {
      return res.status(404).json({ error: "Encargo não encontrado" });
    }

    await encargo.update(req.body); // Supondo que os novos dados estejam no corpo da requisição
    return res.status(200).json(encargo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar o encargo" });
  }
}

// Função para excluir um encargo/obrigação
async function excluirEncargo(req, res) {
  try {
    const encargoId = req.params.id; // Supondo que o ID do encargo seja passado como um parâmetro na rota  
    const nivelUsuario = req.user.nivel;

    // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
    if (nivelUsuario < 3) {
       return res.status(403).json({ mensagem: "Permissão negada." });
    }
    
    const encargo = await EncargosObrigacoes.findByPk(encargoId);
    if (!encargo) {
      return res.status(404).json({ error: "Encargo não encontrado" });
    }

    await encargo.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir o encargo" });
  }
}

// Função para listar todos os encargos/obrigações
async function listarEncargos(req, res) {
  try {
    const { dataInicio, dataFim, termoBusca } = req.query;

    // Construa as condições de pesquisa com base nos filtros de data e termo de busca
    const conditions = 0;
    if (dataInicio && dataFim) {
        conditions.data_atividade = { [Op.between]: [dataInicio, dataFim] };
    }
    if (termoBusca) {
        conditions.nome_atividade = { [Op.like]: `%${termoBusca}%` };
    }

    const encargos = await EncargosObrigacoes.findAll({ where: conditions });
    return res.status(200).json(encargos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar os encargos" });
  }
}

export { 
    cadastrarEncargo, 
    editarEncargo, 
    excluirEncargo, 
    listarEncargos 
};
