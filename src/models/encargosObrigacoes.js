import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
import Usuario from './usuario.js';
const { DataTypes, Model } = Sequelize;

class EncargosObrigacoes extends Model {}

EncargosObrigacoes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios', 
            key: 'id', 
        },
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    porcentagem: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'EncargosObrigacoes',
    tableName: 'encargos_obrigacoes', 
});

EncargosObrigacoes.belongsTo(Usuario, {
    foreingKey: 'id_usuario',
    as: 'usuario',
});

export default EncargosObrigacoes;