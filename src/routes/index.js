import express from 'express';
import { cadastrar, editar, excluir, listarUsuarios } from '../controllers/cadastroController.js';
import { login, logout } from '../controllers/loginController.js';
import { 
    cadastrarFicha, 
    editarFicha, 
    listagem, 
    excluirFicha 
} from '../controllers/RecursosHumanos/fichaController.js';
import {
    cadastrarProjeto, 
    editarProjeto, 
    excluirProjeto, 
    listarProjetos, 
    editarStatusProjeto, 
    cadastrarStatusProjeto
} from '../controllers/Planejamento/projetoController.js'


const router = express.Router();

// Rotas

// Usuário Cadastro
router.post("/cadastro", cadastrar);
router.put("/usuarios/:id", editar);
router.delete("/usuarios/:id", excluir);
router.get("/usuarios", listarUsuarios);

// Login
router.post("/login", login);
router.get("/logout/:id", logout);

// Recursos Humanos
router.post("/cadastrarFicha", cadastrarFicha);
router.get('/usuarios/:idUsuario/fichas-habilidades', listagem);
router.delete("/krfv :id", excluirFicha);
router.put("/editarFicha/:id", editarFicha);

// Planejamento 
router.post("/cadastrarProjeto", cadastrarProjeto);
router.put("/editarProjet", editarProjeto);
router.delete("/excluirProjeto", excluirProjeto);
router.get("/listarProjeto", listarProjetos);
router.put("/editarStatusProjeto", editarStatusProjeto);
router.post("/cadastrarStatus", cadastrarStatusProjeto);

export default router;
