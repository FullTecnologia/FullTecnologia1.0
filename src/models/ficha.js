import { sequelize } from '../config/configDataBase.js';
import Sequelize from 'sequelize';
import Usuario from './usuario.js';

const { DataTypes, Model } = Sequelize;

class Ficha extends Model {}

Ficha.init({
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
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    naturalidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nome_mae: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_pai: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    carteira_identidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    expedidor_identidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data_emissao_identidade: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    titulo_eleitor_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    titulo_eleitor_zona: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    titulo_eleitor_secao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ctps_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ctps_serie: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ctps_uf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ctps_data_emissao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    pis_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pis_data_cadastro: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    carteira_habilitacao_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    carteira_habilitacao_categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado_civil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    escolaridade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    raca_cor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    certificado_reservista_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    certificado_reservista_categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_cep: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_complemento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_cidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_bairro: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endereco_uf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data_admissao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    salario: {
        type: DataTypes.FLOAT, 
        allowNull: true,
    },
    contrato_experiencia: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    horario_trabalho: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    intervalo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descanso: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    horario_sabado: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vale_transporte: {
        type: DataTypes.BOOLEAN, // BOOLEAN para true/false(1/0)
        allowNull: true,
    },
    informacoes_complementares: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Ficha',
    tableName: 'fichas',
});

Ficha.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});

export default Ficha;
