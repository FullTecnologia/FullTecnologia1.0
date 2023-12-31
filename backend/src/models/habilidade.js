import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
import Usuario from './usuario.js';

const { DataTypes, Model } = Sequelize;

class Habilidade extends Model {}

Habilidade.init({
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
            model: Usuario,
            key: 'id',
        },
    },
    habilidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    especialidade: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Habilidade',
    tableName: 'habilidades',
});

Habilidade.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});

export default Habilidade;