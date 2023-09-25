import Usuario from '../models/usuario.js';
import Login from '../models/login.js';
import { firebaseAuth } from '../config/firebaseConfig.js';

async function login(req, res) {
    try {
        // Extrai o email e senha dos parâmetros da solicitação
        const { email, senha } = req.body;

        // Verifica as credenciais no Firebase
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, senha);

        if (!userCredential) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        } else {
            // busar pelo id so user no banco de usuarios
            const userId = await Usuario.findOne({ where: { email } });
            // Se as credenciais estiverem corretas, registre o login na tabela de logins
            const login = await Login.create({
                id_usuario: userId, 
                hora_login: new Date(), // Registra o horário de login
                hora_logout: null, // Inicialmente, hora_logout é nula
            });

            return res.status(200).json({ 
                mensagem: "Login bem-sucedido.",
                data: login,
            });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao logar usuário." , error: error});
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

            return res.status(200).json({ mensagem: "Logout bem-sucedido."});
        }

    } catch (error) {
        console.error(error);
    }
}

export {
    login, 
    logout,
};
