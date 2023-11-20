import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
const { DataTypes, Model } = Sequelize;

class Usuario extends Model { }

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fotoPerfil: {
        type: DataTypes.STRING, // Pode ser uma string para o caminho do arquivo ou um BLOB para armazenar diretamente a imagem.
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Usuario', // Nome do modelo
    tableName: 'usuarios' // Nome da tabela no banco de dados
});

export default Usuario;
