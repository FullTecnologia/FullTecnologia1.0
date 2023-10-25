import express from 'express';
import { sequelize } from './src/models/index.js';
import Router from './src/routes/index.js';
import cors from 'cors'; // Importe o pacote 'cors'

const app = express();

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados: ', error);
});

app.use(express.json());

// Configurar o middleware de CORS para permitir solicitações da origem do seu frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api', Router);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});