import express from 'express';
import { cadastrar } from '../controllers/cadastroController.js';
import { login, logout } from '../controllers/loginController.js';
import { cadastrarFicha, editarFicha, listagem, excluirFicha } from '../controllers/RecursosHumanos/fichaController.js';

const router = express.Router();

// Routes
router.post("/cadastro", async (req, res) => {
    try {
        await cadastrar(req, res);
    } catch (error) {
        res.status(400).send("Erro ao fazer requisição: " + error);
    }
});

router.post("/login", async(req, res) => {
    try{
        await login(req, res);
    } catch (error){
        res.status(400).send("Erro ao fazer requisição: " + error);
    }
});

router.get("/logout", async(req, res) => {
    try {
        await logout(idUsuario);
    } catch (error) {
        res.status(400).send("Erro ao fazer requisição: " + error);
    }
});

router.get('/usuarios/:idUsuario/fichas-habilidades', listagem);

router.delete('/:id', excluirFicha);

export default router;
