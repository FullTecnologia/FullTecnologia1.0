import { sequelize } from "../config/configDataBase.js";

import Usuario from "./usuario.js";
import Login from "./login.js";
import Ficha from "./ficha.js";
import Habilidade from "./habilidade.js";

export { 
    sequelize,
    Usuario,
    Login,
    Ficha,
    Habilidade
};
