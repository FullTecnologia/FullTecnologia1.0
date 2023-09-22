import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
const { DataTypes, Model } = Sequelize;

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    },
    firebase: { 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Usuario', // Nome do modelo
    tableName: 'usuarios' // Nome da tabela no banco de dados
});

export default Usuario;
