import Projeto from "../../models";
import StatusProjeto from "../../models";

async function cadastrarProjeto(req, res) {
    try {
        const { dadosProjeto } = req.body;

        // Insere os dados do projeto no banco de dados
        const projeto = await Projeto.create(dadosProjeto);

        // Retorna o projeto cadastrado
        return res.status(201).json({ mensagem: "Projeto cadastrado com sucesso.", projeto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar projeto." });
    }
};

async function editarProjeto(req, res) {
    try {
        const { id } = req.params;
        const { dadosProjeto } = req.body;

        // Encontra o projeto pelo ID e atualiza os dados
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).json({ mensagem: "Projeto não encontrado." });
        }

        await projeto.update(dadosProjeto);

        // Retorna o projeto atualizado
        return res.json({ mensagem: "Projeto atualizado com sucesso.", projeto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao editar projeto." });
    }
};

async function excluirProjeto(req, res) {
    try {
        const { id } = req.params;

        // Encontra o projeto pelo ID e o exclui
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).json({ mensagem: "Projeto não encontrado." });
        }

        await projeto.destroy();

        // Retorna uma mensagem de sucesso
        return res.json({ mensagem: "Projeto excluído com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao excluir projeto." });
    }
};

async function listarProjetos(req, res) {
    try {
        // Lista todos os projetos do banco de dados
        const projetos = await Projeto.findAll();

        // Retorna a lista de projetos
        return res.json(projetos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar projetos." });
    }
};

async function editarStatusProjeto(req, res) {
    try {
        const { id } = req.params;
        const { novoStatusId, novaEtapa } = req.body;

        // Encontra o projeto pelo ID
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).json({ mensagem: "Projeto não encontrado." });
        }

        // Encontra o status com base no novoStatusId
        const novoStatus = await StatusProjeto.findByPk(novoStatusId);
        if (!novoStatus) {
            return res.status(404).json({ mensagem: "Status não encontrado." });
        }

        // Atualiza o status e a etapa do projeto
        projeto.statusId = novoStatusId;
        projeto.etapa = novaEtapa;

        // Salva as alterações no banco de dados
        await projeto.save();

        // Retorna o projeto atualizado
        return res.json({ mensagem: "Status do projeto atualizado com sucesso.", projeto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao atualizar o status do projeto." });
    }
};

async function cadastrarStatusProjeto(req, res) {
    try {
        const { etapa } = req.body; // Supondo que você recebe a etapa do status no corpo da requisição

        // Cria um novo status de projeto
        const novoStatus = await StatusProjeto.create({ etapa });

        // Retorna o status de projeto cadastrado
        return res.status(201).json({ mensagem: "Status de projeto cadastrado com sucesso.", novoStatus });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar o status de projeto." });
    }
}

export {
    cadastrarProjeto,
    editarProjeto,
    excluirProjeto,
    listarProjetos,
    editarStatusProjeto,
    cadastrarStatusProjeto
};