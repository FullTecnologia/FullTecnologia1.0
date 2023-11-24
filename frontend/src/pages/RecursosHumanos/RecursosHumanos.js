import styles from "./RecursosHumanos.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { fetchDataFromAtividades, cadastrarAtividade } from '../../hooks/apiService';
import { Table, Colab } from "../../components/Table/Table";
import NavBar from "../../components/NavBar/NavBar";
import { validateForm } from "../../hooks/validation";
import "../../components/Popup/style.css";

function RecursosHumanos() {
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

  // ALTERAÇÃO DAQUI 

  // Função para buscar os dados do banco de dados
  const listarAtividades = async () => {
    try {
      const atividadesData = await fetchDataFromAtividades();
      setAtividades(atividadesData);
    } catch (error) {
      console.error(error);
    }
  };

  // ALTERAÇÃO ATÉ AQUI

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

  // ALTERAÇÕES NESSA FUNÇÃO ABAIXO

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(atividade);

    if (Object.keys(errors).length === 0) {
      try {
        const data = await cadastrarAtividade(atividade);

        if (data) {
          console.log(data);
          closeModal('modalAtividade');
          listarAtividades();
        }
      } catch (error) {
        console.error(error);
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
