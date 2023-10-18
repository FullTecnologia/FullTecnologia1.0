import Ficha from '../../models/ficha.js';
import Usuario from '../../models/usuario.js';
import Habilidade from '../../models/habilidade.js';

async function cadastrarFicha(req, res) {
    try {
        const { dadosFicha } = req.boby;
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

        // Consulta SQL para buscar um usuário específico com suas fichas e habilidades
        const usuario = await Usuario.findByPk(id, {
            include: [
                {
                    model: Ficha,
                    as: 'fichas',
                    include: Habilidade, // Inclui as habilidades relacionadas à ficha
                },
            ],
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

// Função para cadastrar uma nova habilidade
async function cadastrarHabilidade(req, res) {
  try {
    const {idUsuario, habilidade, especialidade} = req.boby;
    // Crie a habilidade usando o modelo Habilidade
    const novaHabilidade = await Habilidade.create({
      id_usuario: idUsuario,
      habilidade: habilidade,
      especialidade: especialidade,
    });

    // Retorne a habilidade recém-criada
    return novaHabilidade;
  } catch (error) {
    // Trate os erros de validação ou outros erros aqui
    console.error('Erro ao cadastrar habilidade:', error);
    throw error;
  }
}


export {
    cadastrarFicha,
    editarFicha, 
    excluirFicha,
    listagem,
    cadastrarHabilidade
};
