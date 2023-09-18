import Ficha from '../models/ficha.js';

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

export {
    cadastrarFicha,
};
