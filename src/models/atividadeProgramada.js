import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
import Usuario from './usuario.js';
const { DataTypes, Model } = Sequelize;

class AtividadeProgramada extends Model {}

AtividadeProgramada.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios', 
            key: 'id', 
        },
    },
    descrição: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.BOOLEAN, // BOOLEAN para true/false
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'AtividadeProgramada', // Nome do modelo
    tableName: 'atividades_programadas' // Nome da tabela no banco de dados
});

AtividadeProgramada.belongsTo(Usuario, {
    foreingKey: 'id_usuario',
    as: 'usuario',
});


export default AtividadeProgramada;