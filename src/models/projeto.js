import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
const { DataTypes, Model } = Sequelize;
import Usuario from './usuario.js';
import StatusProjeto from './statusProjeto.js';

class Projeto extends Model {}

Projeto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    numeroContrato: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios', 
            key: 'id', 
        },
    },
    nomeProjeto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_gestor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios', 
            key: 'id', 
        },
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataAtualizacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    avanco: {
        type: DataTypes.DECIMAL(5, 2), // Campo para porcentagem de avanço
        allowNull: false,
    },
    pendencias: {
        type: DataTypes.TEXT,
    },
    statusProjeto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: StatusProjeto,
            as: 'id',
        }
    },
}, {
    sequelize,
    modelName: 'Projeto',
    tableName: 'projetos',
});

Projeto.belongsTo(Usuario, {
    foreignKey: 'id_empresa',
    as: 'empresa',
});

Projeto.belongsTo(Usuario, {
    foreignKey: 'id_gestor',
    as: 'gestor',
});

Projeto.belongsTo(StatusProjeto, {
    foreignKey: 'id_status',
    as: 'status',
});

export default Projeto;
