import express from 'express';
import { sequelize } from './src/models/index.js';
import Router from './src/routes/index.js';

const app = express();

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados: ', error);
});

app.use(express.json());

app.use('/api', Router);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});
