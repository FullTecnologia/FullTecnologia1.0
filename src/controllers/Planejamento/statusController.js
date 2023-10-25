import StatusProjeto from '../../models/statusProjeto.js'; 

// Função para cadastrar uma nova etapa de projeto
async function cadastrarEtapaProjeto(req, res) {
    try {
        const { etapa } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Insira a nova etapa de projeto no banco de dados
        const novaEtapa = await StatusProjeto.create({
            etapa,
        });

        // Retorna a etapa de projeto cadastrada
        return res.status(201).json(novaEtapa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar etapa de projeto." });
    }
}

// Função para listar todas as etapas de projetos
async function listarEtapasProjetos(req, res) {
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

        // Consulte todas as etapas de projetos
        const etapas = await StatusProjeto.findAll({ where: conditions });

        // Retorna a lista de etapas de projetos
        return res.status(200).json(etapas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar etapas de projetos." });
    }
}

// Função para excluir uma etapa de projeto por ID
async function excluirEtapaProjeto(req, res) {
    try {
        const { id } = req.params;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Verifique se a etapa de projeto existe
        const etapaProjeto = await StatusProjeto.findByPk(id);

        if (!etapaProjeto) {
            return res.status(404).json({ mensagem: "Etapa de projeto não encontrada." });
        }

        // Exclua a etapa de projeto
        await etapaProjeto.destroy();

        // Retorna uma mensagem de sucesso
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao excluir etapa de projeto." });
    }
}

export {
    cadastrarEtapaProjeto,
    listarEtapasProjetos,
    excluirEtapaProjeto,
};