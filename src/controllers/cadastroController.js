import Usuario from "../models/usuario.js";
import { firebaseAuth } from "../config/firebaseConfig.js"; 

async function cadastrar(req, res) {
  try {
    const { nome, email, senha, nivel } = req.body;

    // Verificar se o email já está em uso
    const existingUser = await Usuario.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ mensagem: "Email já está em uso." });
    }

    // Criptografar a senha usando o Firebase Auth
    const userRecord = await firebaseAuth.createUser({
      email,
      password: senha,
    });

    // Obter a senha criptografada do Firebase
    const firebaseUi = userRecord.toJSON().uid;

    // Salvar o usuário no banco de dados com a senha criptografada
    const novoUsuario = new Usuario({
      nome,
      email,
      firebase: firebaseUi, // Salvar a senha criptografada no banco de dados
      nivel,
    });

    await novoUsuario.save();

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
}

async function editar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha, nivel } = req.body;

    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Atualizar os dados do usuário
    usuario.nome = nome;
    usuario.email = email;
    usuario.nivel = nivel;

    if (senha) {
      // Se uma nova senha for fornecida, criptografe-a e atualize-a
      // adicionar a autentificação do firebase
      const senhaCriptografada = senha; 
      usuario.firebase = senhaCriptografada;
    }

    await usuario.save();

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao editar usuário." });
  }
}

async function excluir(req, res) {
  try {
    const { id } = req.params;

    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Excluir o usuário
    await usuario.destroy();

    return res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao excluir usuário." });
  }
}

async function listarUsuarios(req, res) {
  try {
    // Consultar todos os usuários
    const usuarios = await Usuario.findAll();

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar usuários." });
  }
}

export {
  cadastrar,
  editar,
  excluir,
  listarUsuarios
};
