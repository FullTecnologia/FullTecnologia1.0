import Projeto from "../../models/projeto.js";
import StatusProjeto from "../../models/statusProjeto.js";

async function cadastrarProjeto(req, res) {
    try {
        const { dadosProjeto } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

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
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

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
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

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
        const { dataInicio, dataFim, termoBusca } = req.query;

        // Construa as condições de pesquisa com base nos filtros de data e termo de busca
        const conditions = 0;
        if (dataInicio && dataFim) {
            conditions.data_atividade = { [Op.between]: [dataInicio, dataFim] };
        }
        if (termoBusca) {
            conditions.nome_atividade = { [Op.like]: `%${termoBusca}%` };
        }

        // Lista todos os projetos do banco de dados
        const projetos = await Projeto.findAll({ where: conditions });

        // Retorna a lista de projetos
        return res.json(projetos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar projetos." });
    }
};

export {
    cadastrarProjeto,
    editarProjeto,
    excluirProjeto,
    listarProjetos,
};