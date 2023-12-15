import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

// components
import Table, { Colab } from "../../components/Table/Table";
import NavBar from "../../components/NavBar/NavBar";
import "../../components/Popup/style.css";

//hooks
import { dataAtividades, cadastrarAtividade, editarAtividade } from "../../hooks/apiService";
import { validateForm } from "../../hooks/validation";

// css
import styles from "./RecursosHumanos.module.css";

// contexts
import { useAuthState } from "../../contexts/AuthContext";
import ModalEdit from "../../components/Popup/modalEdit";

function RecursosHumanos() {
  const { id_usuario } = useAuthState();
  const [atividades, setAtividades] = useState([]);
  const [currentAtividade, setCurrentAtividade] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [atividade, setAtividade] = useState({
    responsavel: "",
    descricao: "",
    dataFim: "",
    status: "iniciado",
    tipo: 0,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const listarAtividades = useCallback(async () => {
    try {
      const atividadesData = await dataAtividades(id_usuario);
      setAtividades(atividadesData); // Atualize o estado com as atividades recebidas
    } catch (error) {
      console.error(error);
    }
  }, [id_usuario]); // id_usuario é uma dependência

  useEffect(() => {
    listarAtividades();
  }, [listarAtividades]); // listarAtividades é uma dependência

  const handleSaveEdit = async (updatedAtividade) => {
    try {
      await editarAtividade(updatedAtividade.id, updatedAtividade);
      setSuccessMessage('Alteração bem sucedida');
      listarAtividades(); // Atualize a lista
    } catch (error) {
      console.error('Erro ao editar atividade:', error);
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
        const response = await cadastrarAtividade(id_usuario, atividade);

        if (response) {
          closeModal("modalAtividade");
          await listarAtividades(); // Chame novamente para atualizar a lista
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);

        if (error.response) {
          console.error("Dados da resposta do servidor:", error.response.data);
        } else if (error.request) {
          console.error("A solicitação foi feita, mas não recebeu resposta");
        } else {
          console.error(
            "Erro durante a configuração da solicitação:",
            error.message
          );
        }
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
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
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
            <Table userId={id_usuario} dataAtv={atividades} />
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

      {/* Exibe a mensagem de sucesso se ela existir */}
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* Modal de Edição de Atividade */}
      {currentAtividade && (
        <ModalEdit
          atividade={currentAtividade}
          onClose={() => setCurrentAtividade(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );

}

export default RecursosHumanos;
