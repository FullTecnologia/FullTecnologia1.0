import { sequelize } from "../config/configDataBase.js";

import Usuario from "./usuario.js";
import Login from "./login.js";
import Ficha from "./ficha.js";
import Habilidade from "./habilidade.js";
import Projeto from "./projeto.js";
import StatusProjeto from "./statusProjeto.js";
import AtividadeProgramada from "./atividadeProgramada.js";

export { 
    sequelize,
    Usuario,
    Login,
    Ficha,
    Habilidade,
    Projeto,
    StatusProjeto,
    AtividadeProgramada
};
