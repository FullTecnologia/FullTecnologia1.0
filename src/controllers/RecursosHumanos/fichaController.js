import Ficha from '../../models/ficha.js';
import Usuario from '../../models/usuario.js';
import Habilidade from '../../models/habilidade.js';

async function cadastrarFicha(req, res) {
    try {
        const { dadosFicha } = req.boby;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Insere os dados da ficha no banco de dados
        const ficha = await Ficha.create(dadosFicha);

        // Retorna a ficha cadastrada
        return ficha;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar ficha." });
    }
}

async function editarFicha(req, res) {
    try {
        const { id } = req.params; // Obtém o ID da ficha a ser editada
        const { dadosFicha } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Encontra a ficha pelo ID
        const ficha = await Ficha.findByPk(id);

        if (!ficha) {
            return res.status(404).json({ mensagem: 'Ficha não encontrada.' });
        }

        // Atualiza os dados da ficha com base nos dados fornecidos
        await ficha.update(dadosFicha);

        // Retorna a ficha atualizada
        return res.status(200).json({ mensagem: 'Ficha atualizada com sucesso.', ficha });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao editar ficha.' });
    }
}

async function excluirFicha(req, res) {
    try {
        const { id } = req.params; // Obtém o ID da ficha a ser excluída
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Encontra a ficha pelo ID
        const ficha = await Ficha.findByPk(id);

        if (!ficha) {
            return res.status(404).json({ mensagem: 'Ficha não encontrada.' });
        }

        // Exclui a ficha
        await ficha.destroy();

        return res.status(200).json({ mensagem: 'Ficha excluída com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao excluir ficha.' });
    }
}

async function listagem(req, res) {
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

        // Consulta SQL para buscar um usuário específico com suas fichas e habilidades
        const usuario = await Usuario.findByPk(id, {
            include: [
                {
                    model: Ficha,
                    as: 'fichas',
                    include: Habilidade, // Inclui as habilidades relacionadas à ficha
                },
            ],
            where: conditions 
        });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao listar usuário, fichas e habilidades.' });
    }
}

export {
    cadastrarFicha,
    editarFicha, 
    excluirFicha,
    listagem,
};
