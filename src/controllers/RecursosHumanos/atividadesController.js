import AtividadeProgramada from "../../models/atividadeProgramada";

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
        
    } catch (error) {
        
    }
}

async function excluirAtividade(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function listarAtividades(req, res) {
    try {
        
    } catch (error) {
        
    }
}

export {
    cadastrarAtividade,
    editarAtividade,
    excluirAtividade,
    listarAtividades,
}