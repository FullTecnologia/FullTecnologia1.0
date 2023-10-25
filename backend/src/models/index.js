<<<<<<< HEAD
import { sequelize } from "../config/configDataBase.js";

export { sequelize };
=======
import { sequelize } from "../config/configDataBase.js";

import Usuario from "./usuario.js";
import Login from "./login.js";
import Ficha from "./ficha.js";
import Habilidade from "./habilidade.js";
import Projeto from "./projeto.js";
import StatusProjeto from "./statusProjeto.js";
import AtividadeProgramada from "./atividadeProgramada.js";
import PedidosEPIs from "./pedidos_epis.js";
import EncargosObrigacoes from "./encargosObrigacoes.js";

export { 
    sequelize,
    Usuario,
    Login,
    Ficha,
    Habilidade,
    Projeto,
    StatusProjeto,
    AtividadeProgramada,
    PedidosEPIs,
    EncargosObrigacoes,
};
>>>>>>> master
