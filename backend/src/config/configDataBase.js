import { Sequelize } from "sequelize";

<<<<<<< HEAD
const sequelize = new Sequelize('homologfull', 'root', 'eduardo@grillo', {
    host: 'localhost',
    dialect: 'mysql'
=======
const sequelize = new Sequelize("homologfull", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
>>>>>>> 8675ad6670051211caf08cc7f1e0c0a3f9b0b65f
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados MySql realizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar com banco de dados MySql: ", error);
  });

export { sequelize };
