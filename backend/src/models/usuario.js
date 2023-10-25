<<<<<<< HEAD
import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
const { DataTypes, Model } = Sequelize;

class Usuario extends Model {}

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
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Usuario', // Nome do modelo
    tableName: 'usuarios' // Nome da tabela no banco de dados (opcional)
});

export default Usuario;
=======
import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
const { DataTypes, Model } = Sequelize;

class Usuario extends Model {}

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
    }
}, {
    sequelize,
    modelName: 'Usuario', // Nome do modelo
    tableName: 'usuarios' // Nome da tabela no banco de dados
});

export default Usuario;
>>>>>>> master
