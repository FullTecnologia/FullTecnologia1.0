import express from 'express';
import { cadastrar, editar, excluir, listarUsuarios } from '../controllers/cadastroController.js';
import { login, logout } from '../controllers/loginController.js';
import { cadastrarFicha, editarFicha, listagem, excluirFicha } from '../controllers/RecursosHumanos/fichaController.js';

const router = express.Router();

// Routas

// Usuário Cadastro
router.post("/cadastro", cadastrar);
router.put("/usuarios/:id", editar);
router.delete("/usuarios/:id", excluir);
router.get("/usuarios", listarUsuarios);

// Login
router.post("/login", login);
router.get("/logout", logout);

// Ficha
router.post("/cadastrarFicha", cadastrarFicha);
router.get('/usuarios/:idUsuario/fichas-habilidades', listagem);
router.delete('/krfv :id', excluirFicha);
router.put('/:id', editarFicha);

// Projeto


export default router;
