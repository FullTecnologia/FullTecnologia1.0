import EncargosObrigacoes from "../../models/encargosObrigacoes";

// Função para cadastrar um novo encargo/obrigação
async function cadastrarEncargo(req, res) {
  try {
    const novoEncargo = await EncargosObrigacoes.create(req.body); 
    return res.status(201).json(novoEncargo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar o encargo" });
  }
}

// Função para editar um encargo/obrigação existente
async function editarEncargo(req, res) {
  const encargoId = req.params.id; // Supondo que o ID do encargo seja passado como um parâmetro na rota
  try {
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
  const encargoId = req.params.id; // Supondo que o ID do encargo seja passado como um parâmetro na rota
  try {
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
    const encargos = await EncargosObrigacoes.findAll();
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
