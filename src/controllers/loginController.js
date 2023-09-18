import Usuario from '../models/usuario.js';
import Login from '../models/login.js';
import { firebaseAuth } from '../config/firebaseConfig.js';

async function login(req, res) {
    try {
        // Extrai o email e senha dos parâmetros da solicitação
        const { email, senha } = req.body;

        // Verifica as credenciais no Firebase
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, senha);

        // Se as credenciais estiverem corretas, registre o login na tabela de logins
        await Login.create({
            id_usuario: userCredential.user.uid,
            hora_login: new Date(), // Registra o horário de login
            hora_logout: null, // Inicialmente, hora_logout é nula
        });

        return res.status(200).json({ mensagem: "Login bem-sucedido." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao logar usuário." });
    }
}

async function logout(idUsuario) {
    try {
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
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    login, 
    logout,
};
