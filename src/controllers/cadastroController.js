import Usuario from "../models/usuario.js";
import { firebaseAuth } from "../config/firebaseConfig.js"; 

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

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
    const senhaCriptografada = userRecord.toJSON().passwordHash;

    // Salvar o usuário no banco de dados com a senha criptografada
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada, // Salvar a senha criptografada no banco de dados
    });

    await novoUsuario.save();

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
}

export {
  cadastrar,
};
