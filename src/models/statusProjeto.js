import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
const { DataTypes, Model } = Sequelize;

class StatusProjeto extends Model {};

StatusProjeto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    etapa: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'StatusProjeto',
    tableName: 'status_projeto',
});

export default StatusProjeto;