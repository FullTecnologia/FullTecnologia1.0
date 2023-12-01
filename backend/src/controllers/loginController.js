import Usuario from '../models/usuario.js';
import Login from '../models/login.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/configJWT.js';

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    // Verifique as credenciais
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Verifique se a senha é válida
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    // Gere um token JWT e envie-o como resposta
    const token = generateToken({ id: usuario.id, nivel: usuario.nivel });

    // Registre o horário de login
    const hora_login = new Date();

    // Crie um registro de login no banco de dados
    const login = await Login.create({
      id_usuario: usuario.id,
      hora_login,
      hora_logout: null, // Inicialmente, hora_logout é nula
    });

    return res.status(200).json({ token, login, mensagem: "Login realizado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao logar usuário." });
  }
}

async function logout(req, res) {
  try {
    const idUsuario = req.params;
    // Encontre o registro de login mais recente para o usuário
    const recentLogin = await Login.findOne({
      where: { id_usuario: idUsuario },
      order: [['hora_login', 'DESC']], // Ordena por hora_login em ordem decrescente
    });

    // Verifica se encontrou um registro de login
    if (recentLogin) {
      // Atualiza a hora_logout no registro de login
      recentLogin.hora_logout = new Date();
      await recentLogin.save();

      return res.status(200).json({ mensagem: "Logout bem-sucedido." });
    }

  } catch (error) {
    console.error(error);
  }
}

export {
  login,
  logout,
};
