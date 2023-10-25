import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
import Usuario from './usuario.js';
const { DataTypes, Model } = Sequelize;

class Login extends Model {}

Login.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Referência à tabela de usuários
            key: 'id', // Campo da tabela de usuários para a relação
        },
    },
    hora_login: {
        type: DataTypes.DATE, // Para armazenar a hora de login
        allowNull: false,
    },
    hora_logout: {
        type: DataTypes.DATE, // Para armazenar a hora de logout
    },
}, {
    sequelize,
    modelName: 'Login', // Nome do modelo
    tableName: 'logins' // Nome da tabela no banco de dados
});

// Relacionamento com a tabela de usuário
Login.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});

export default Login;