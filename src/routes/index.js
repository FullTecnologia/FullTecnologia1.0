import express from 'express';
import { cadastrar, editar, excluir, listarUsuarios } from '../controllers/cadastroController.js';
import { login, logout } from '../controllers/loginController.js';

// Recursos Humanos
import { 
    cadastrarFicha, 
    editarFicha, 
    listagem, 
    excluirFicha 
} from '../controllers/RecursosHumanos/fichaController.js';
import {
    cadastrarAtividade,
    editarAtividade,
    excluirAtividade,
    listarAtividades,
} from '../controllers/RecursosHumanos/atividadesController.js';
import {
    cadastrarPedidoEPI,
    editarPedidoEPI,
    excluirPedidoEPI,
    listarPedidosEPI,
} from '../controllers/RecursosHumanos/epiControllers.js';
import {
    cadastrarHabilidade,
    excluirHabilidade,
    listarHabilidadesDoUsuario,
} from '../controllers/RecursosHumanos/habilidadesController.js';
import {
    cadastrarEncargo, 
    editarEncargo, 
    excluirEncargo, 
    listarEncargos 
} from '../controllers/RecursosHumanos/encargosController.js';

// Planejamento
import {
    cadastrarProjeto, 
    editarProjeto, 
    excluirProjeto, 
    listarProjetos, 
} from '../controllers/Planejamento/projetoController.js';
import {
    cadastrarEtapaProjeto,
    listarEtapasProjetos,
    excluirEtapaProjeto,
} from '../controllers/Planejamento/statusController.js'


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
router.get('/usuarios/:id', listagem);
router.delete("/excluirFucha/:id", excluirFicha);
router.put("/editarFicha/:id", editarFicha);
router.post("/cadastrarAtividade", cadastrarAtividade);
router.get('/listarAtividade/:id', listarAtividades);
router.delete("/excluirAtividade/:id", excluirAtividade);
router.put("/editarAtividade/:id", editarAtividade,);
router.post("/cadastrarPedidoEPI", cadastrarPedidoEPI);
router.get('/listarPedidosEPI', listarPedidosEPI);
router.delete("/excluirPedidoEPI/:id", excluirPedidoEPI);
router.put("/editarFicha/:id", editarPedidoEPI);
router.post("/cadastrarHabilidades", cadastrarHabilidade);
router.get("/listarHabilidades", listarHabilidadesDoUsuario);
router.delete("/excluirHabilidade/:id", excluirHabilidade);
router.post("/encargos", cadastrarEncargo);
router.put("/encargos/:id", editarEncargo);
router.delete("/encargos/:id", excluirEncargo);
router.get("/encargos", listarEncargos);

// Planejamento 
router.post("/cadastrarProjeto", cadastrarProjeto);
router.put("/editarProjet/:id", editarProjeto);
router.delete("/excluirProjeto/:id", excluirProjeto);
router.get("/listarProjeto", listarProjetos);
router.post("/cadastrarEtapa", cadastrarEtapaProjeto);
router.get("/listarEtapas", listarEtapasProjetos);
router.delete("/excluirEtapa/:id", excluirEtapaProjeto);

export default router;
