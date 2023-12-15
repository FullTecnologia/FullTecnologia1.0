import Usuario from "../../models/usuario.js";
import Ficha from "../../models/ficha.js";
import Habilidade from "../../models/habilidade.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { mkdir } from "fs/promises";

async function cadastrar(req, res) {
  try {
    const { nome, email, senha, nivel, fotoPerfil } = req.body;
    const { id } = req.params;

    const rootDir = "/FullTecnologia1.0/frontend/src";

    // Verifique se o nível do usuário é adequado (exemplo: nível 3 ou superior)
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não autentificado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel !== 1 && usuario.nivel !== 3) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }
    // Verificar se o email já está em uso
    const existingUser = await Usuario.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ mensagem: "Email já está em uso." });
    }

    // Realize o upload da foto de perfil
    const fotoPerfilPath = path.join(rootDir, "imagens");
    try {
      await mkdir(fotoPerfilPath, { recursive: true });
    } catch (mkdirError) {
      if (mkdirError.code !== "EEXIST") {
        throw mkdirError;
      }
    }

    // Crie a pasta se não existir
    const fotoPerfilCaminhoCompleto = path.join(
      fotoPerfilPath,
      `foto_perfil_${Date.now()}.jpg`
    );
    fs.writeFileSync(fotoPerfilCaminhoCompleto, fotoPerfil, "base64");

    // Criptografar a senha usando bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10); // 10 é o número de rounds de criptografia

    // Salvar o usuário no banco de dados com a senha criptografada e o caminho da foto de perfil
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      nivel,
      fotoPerfil: fotoPerfilCaminhoCompleto,
    });

    await novoUsuario.save();

    return res
      .status(200)
      .json({ mensagem: "Usuário cadastrado com sucesso.", novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
}

async function editar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha, nivel } = req.body;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifica o nível do usuário obtido do banco de dados
    if (usuario.nivel < 1) {
      return res.status(403).json({ mensagem: "Permissão negada." });
    }

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Atualizar os dados do usuário
    usuario.nome = nome;
    usuario.email = email;
    usuario.nivel = nivel;

    if (senha) {
      // Se uma nova senha for fornecida, criptografe-a e atualize-a
      // adicionar a autentificação
      const senhaCriptografada = senha;
      usuario.firebase = senhaCriptografada;
    }

    await usuario.save();

    return res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao editar usuário." });
  }
}

async function excluir(req, res) {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const ficha = await Ficha.findAll({ where: { id_usuario: id } });

    if (!ficha) {
      return res.status(404).json({ mensagem: "Ficha não encontrada." });
    }

    const habilidade = await Habilidade.findAll({ where: { id_usuario: id } });

    if (!habilidade) {
      return res.status(404).json({ mensagem: "Habilidade não encontrada." });
    }

    // Exclui a ficha
    await ficha.destroy();
    // Excluir o usuário
    await usuario.destroy();
    // Exclua a habilidade
    await habilidade.destroy();

    return res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao excluir usuário." });
  }
}

async function listarUsuarios(req, res) {
  try {
    const { dataInicio, dataFim, termoBusca } = req.query;

    // Construa as condições de pesquisa com base nos filtros de data e termo de busca
    const conditions = null;
    if (dataInicio && dataFim) {
      conditions.data_atividade = { [Op.between]: [dataInicio, dataFim] };
    }
    if (termoBusca) {
      conditions.nome_atividade = { [Op.like]: `%${termoBusca}%` };
    }

    // Consultar todos os usuários
    const usuarios = await Usuario.findAll({ where: conditions });

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar usuários." });
  }
}

export { cadastrar, editar, excluir, listarUsuarios };
