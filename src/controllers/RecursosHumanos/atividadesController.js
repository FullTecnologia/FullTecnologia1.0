import AtividadeProgramada from "../../models/atividadeProgramada.js";

async function cadastrarAtividade(req, res) {
    try {
        const {dadosAtividade} = req.body;
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

        // Consulte todas as atividades programadas para o usuário específico
        const atividades = await AtividadeProgramada.findAll({
            where: {
                id_usuario: id,
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