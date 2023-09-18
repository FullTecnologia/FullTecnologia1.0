import express from 'express';
import { cadastrar } from '../controllers/cadastroController.js';

const router = express.Router();

// Routes
router.post("/cadastro", async (req, res) => {
    try {
        await cadastrar(req, res);
    } catch (error) {
        res.status(400).send("Erro ao fazer requisição: " + error);
    }
});

export default router;
