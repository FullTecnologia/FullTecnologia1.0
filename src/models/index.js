import { sequelize } from "../config/configDataBase.js";

import Usuario from "./usuario.js";
import Login from "./login.js";
import Ficha from "./ficha.js";
import Habilidade from "./habilidade.js";
import Projeto from "./projeto.js";

export { 
    sequelize,
    Usuario,
    Login,
    Ficha,
    Habilidade,
    Projeto
};
