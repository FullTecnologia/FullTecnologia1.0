import { sequelize } from '../config/configDataBase.js';
import { Sequelize } from 'sequelize';
const { DataTypes, Model } = Sequelize;
import Usuario from './usuario.js';

class Projeto extends Model {}

Projeto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    numeroContrato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', 
            key: 'id', 
        },
    },
    nomeProjeto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_gestor: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
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
    etapa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'StatusProjeto',
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

export default Projeto;
