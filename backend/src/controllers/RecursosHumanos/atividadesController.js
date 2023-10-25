import AtividadeProgramada from "../../models/atividadeProgramada.js";

async function cadastrarAtividade(req, res) {
    try {
        const {dadosAtividade} = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Insere os dados da atividade no banco de dados
        const atividade = await AtividadeProgramada.create(dadosAtividade);

        // Retorna a atividade cadastrada
        return atividade;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar atividade." });
    }
}

async function editarAtividade(req, res) {
    try {
        const { id } = req.params; 
        const { dadosAtividade } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
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
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
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
            where: {
                id_usuario: id,
                conditions,
            },
        });

        // Retorna a lista de atividades do usuário
        return res.status(200).json(atividades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar atividades do usuário." });
    }
}

export {
    cadastrarAtividade,
    editarAtividade,
    excluirAtividade,
    listarAtividades,
}