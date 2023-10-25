import Habilidade from '../../models/habilidade.js'

// Função para cadastrar uma nova habilidade
async function cadastrarHabilidade(req, res) {
    try {
        const { id_usuario, habilidade, especialidade } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Insira os dados da habilidade no banco de dados
        const novaHabilidade = await Habilidade.create({
            id_usuario,
            habilidade,
            especialidade,
        });

        // Retorna a habilidade cadastrada
        return res.status(201).json(novaHabilidade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar habilidade." });
    }
};

// Função para excluir uma habilidade por ID
async function excluirHabilidade(req, res) {
    try {
        const { id } = req.params;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Verifique se a habilidade existe
        const habilidade = await Habilidade.findByPk(id);

        if (!habilidade) {
            return res.status(404).json({ mensagem: "Habilidade não encontrada." });
        }

        // Exclua a habilidade
        await habilidade.destroy();

        // Retorna uma mensagem de sucesso
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao excluir habilidade." });
    }
};

// Função para listar as habilidades de um usuário pelo ID do usuário
async function listarHabilidadesDoUsuario(req, res) {
    try {
        const { id } = req.params; // Supondo que você está passando o ID do usuário como parâmetro na rota
        const { dataInicio, dataFim, termoBusca } = req.query;

        // Construa as condições de pesquisa com base nos filtros de data e termo de busca
        const conditions = { id_usuario: id };
        if (dataInicio && dataFim) {
            conditions.data_atividade = { [Op.between]: [dataInicio, dataFim] };
        }
        if (termoBusca) {
            conditions.nome_atividade = { [Op.like]: `%${termoBusca}%` };
        }

        // Consulte as habilidades do usuário com base no ID do usuário
        const habilidades = await Habilidade.findAll({
            where: { id_usuario: id },
        });

        // Retorna a lista de habilidades do usuário
        return res.status(200).json(habilidades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar habilidades do usuário." });
    }
};

export {
    cadastrarHabilidade,
    excluirHabilidade,
    listarHabilidadesDoUsuario,
};