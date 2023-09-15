import { Sequelize } from "sequelize";

const sequelize = new Sequelize('homologfull', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados MySql realizada com sucesso!');
}).catch((error) => {
    console.error('Erro ao conectar com banco de dados MySql: ', error);
});

export { sequelize };
