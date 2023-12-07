import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

// components
import { Table, Colab } from "../../components/Table/Table";
import NavBar from "../../components/NavBar/NavBar";
import "../../components/Popup/style.css";

//hooks
import { dataAtividades, cadastrarAtividade } from '../../hooks/apiService';
import { validateForm } from "../../hooks/validation";

// css
import styles from "./RecursosHumanos.module.css";

// contexts
import { useAuth } from "../../contexts/AuthContext";

function RecursosHumanos() {
  const { state } = useAuth();  // Obtenha o estado de autenticação do contexto
  const { id_usuario } = state;

  console.log("ID do usuário no Cadastrar Atividade:", id_usuario);

  const [atividade, setAtividade] = useState({
    responsavel: "",
    descricao: "",
    dataFim: "",
    status: "iniciado",
    tipo: 0,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [atividades, setAtividades] = useState([]); // Adicionando estado para armazenar atividades

  const navigate = useNavigate();

  useEffect(() => {
    // Chama a função para buscar os dados ao carregar o componente
    listarAtividades();
  }, []);

  // Função para buscar os dados do banco de dados
  const listarAtividades = async () => {
    try {
      const atividadesData = await dataAtividades();
      setAtividades(atividadesData);
    } catch (error) {
      console.error(error);
    }
  };

  function showModal(modalType) {
    var element = document.getElementById(`modal${modalType}`);
    if (element) {
      element.classList.add("show-modal");
    }
  }

  function closeModal(modalId) {
    var element = document.getElementById(modalId);
    element.classList.remove("show-modal");

    setAtividade({
      responsavel: "",
      descricao: "",
      dataFim: "",
      status: "iniciado",
      tipo: 0,
    });

    // Limpe quaisquer erros de validação
    setValidationErrors({});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setAtividade({
      ...atividade,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(atividade);

    if (Object.keys(errors).length === 0) {
      try {
        // Certifique-se de passar id_usuario ao chamar a função
        const response = await cadastrarAtividade({ ...atividade, id_usuario });

        if (response.data) {
          console.log("Dados enviados para cadastrarAtividade:", { ...atividade, id_usuario });
          console.log("Resposta da solicitação:", response.data);

          closeModal('modalAtividade');
          listarAtividades();
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);

        if (error.response) {
          // O servidor retornou uma resposta com um código de status diferente de 2xx
          console.error("Dados da resposta do servidor:", error.response.data);
          console.error("Código de status da resposta:", error.response.status);
          console.error("O valor do id do usuario que está retornando: ", error.response.data.id_usuario);
        } else if (error.request) {
          // A solicitação foi feita, mas não recebeu resposta
          console.error("A solicitação foi feita, mas não recebeu resposta");
        } else {
          // Algo aconteceu durante a configuração da solicitação que desencadeou um erro
          console.error("Erro durante a configuração da solicitação:", error.message);
        }

        // Se necessário, adicione mais lógica para lidar com o erro
      }
    } else {
      setValidationErrors(errors);
    }
  };


  function handleClick() {
    // Navegar para outra rota
    navigate("/cadastrarColaborador");
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="responsavel">Responsável:</label>

          <input
            type="text"
            id="responsavel"
            name="responsavel"
            value={atividade.responsavel}
            onChange={handleInputChange}
            className="form-input"
          />

          <span className="error">{validationErrors.responsavel}</span>
        </div>

        <div>
          <label htmlFor="descricao">Descrição:</label>

          <input
            type="text"
            id="descricao"
            name="descricao"
            value={atividade.descricao}
            onChange={handleInputChange}
          />

          <span className="error">{validationErrors.descricao}</span>
        </div>
        <div>
          <label htmlFor="dataFim">Data de Fim:</label>

          <input
            type="date"
            id="dataFim"
            name="dataFim"
            value={atividade.dataFim}
            onChange={handleInputChange}
          />

          <span className="error">{validationErrors.dataFim}</span>
        </div>

        <div>
          <label htmlFor="status">Status:</label>

          <select
            id="status"
            name="status"
            value={atividade.status}
            onChange={handleInputChange}
          >
            <option value="iniciado">Iniciado</option>
            <option value="concluido">Concluído</option>
            <option value="finalizado">Finalizado</option>
          </select>

          <span className="error">{validationErrors.status}</span>
        </div>

        <div>
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={atividade.tipo}
            onChange={handleInputChange}
          >
            <option value="0">Não Prioritário</option>
            <option value="1">Prioritário</option>
          </select>

          <span className="error">{validationErrors.tipo}</span>
        </div>

        <div>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <NavBar />

      <div className={styles.titlePage}>
        <h1>Recursos Humanos</h1>
      </div>

      <div className={styles.bodyRecursos}>
        <div className={styles.titlePage}>
          <h2>Minhas Atividades</h2>
        </div>

        <div className={styles.activitySection}>
          <div className={styles.ajusteContainer}>
            <button
              className={styles.trigger}
              onClick={() => showModal("Atividade")}
            >
              Cadastrar Atividade
            </button>
            <Table atividades={atividades} />
          </div>

          <div className="modal" id="modalAtividade">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={() => closeModal("modalAtividade")}
              >
                &times;
              </span>

              <h2>Cadastrar Atividade</h2>
              {renderForm()}
            </div>
          </div>
        </div>

        <div className={styles.titlePageColab}>
          <h2>Gerenciamento de Colaboradores</h2>
        </div>

        <div className={styles.colaboradorSection}>
          <div>
            <button className={styles.triggerColab} onClick={handleClick}>
              Cadastrar Colaborador
            </button>
            <Colab />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecursosHumanos;
