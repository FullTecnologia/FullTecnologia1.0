import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
import Usuario from './usuario.js';
const { DataTypes, Model } = Sequelize;

class PedidosEPIs extends Model {}

PedidosEPIs.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncremente: true,
        allowNull: true,
        primaryKey: true,
    },
    id_projetista: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios',
            key: 'id',
        },
    },
    id_assinante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios',
            key: 'id',
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descrição: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data_retirada: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    data_devolucao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'PedidosEPIs',
    tableName: 'pedidos_epis',
});

PedidosEPIs.belongsTo(Usuario, {
    foreingKey: 'id_usuario',
    as: 'usuario',
});

export default PedidosEPIs;