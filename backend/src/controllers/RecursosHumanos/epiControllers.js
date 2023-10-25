import PedidosEPIs from "../../models/pedidos_epis.js";

async function cadastrarPedidoEPI(req, res) {
    try {
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        const { dadosPedido } = req.body;
        // Insere os dados do pedido no banco de dados
        const pedido = await PedidosEPIs.create(dadosPedido);

        // Retorna o pedido cadastrado
        return res.status(201).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar pedido de EPI." });
    }
}

async function editarPedidoEPI(req, res) {
    try {
        const { id } = req.params;
        const { dadosPedido } = req.body;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
        return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Verifique se o pedido existe
        const pedido = await PedidosEPIs.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ mensagem: "Pedido de EPI não encontrado." });
        }

        // Atualize os dados do pedido
        await pedido.update(dadosPedido);

        // Retorna o pedido atualizado
        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao atualizar pedido de EPI." });
    }
}

async function excluirPedidoEPI(req, res) {
    try {
        const { id } = req.params;
        const nivelUsuario = req.user.nivel;

        // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
        if (nivelUsuario < 3) {
            return res.status(403).json({ mensagem: "Permissão negada." });
        }

        // Verifique se o pedido existe
        const pedido = await PedidosEPIs.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ mensagem: "Pedido de EPI não encontrado." });
        }

        // Exclua o pedido
        await pedido.destroy();

        // Retorna uma mensagem de sucesso
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao excluir pedido de EPI." });
    }
}

async function listarPedidosEPI(req, res) {
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
        
        // Consulte todos os pedidos de EPI
        const pedidos = await PedidosEPIs.findAll({ where: conditions });

        // Retorna a lista de pedidos
        return res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao listar pedidos de EPI." });
    }
}

export {
    cadastrarPedidoEPI,
    editarPedidoEPI,
    excluirPedidoEPI,
    listarPedidosEPI,
}
