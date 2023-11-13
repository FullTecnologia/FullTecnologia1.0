import React, { useState } from "react";
import { Table, Colab } from "../../components/Table/Table";
import NavBar from "../../components/NavBar/NavBar";
import { validateForm, validateColaborador } from "../../hooks/validation";
import "../../components/Popup/style.css";
import styles from "./RecursosHumanos.module.css";

function RecursosHumanos() {
  const [atividade, setAtividade] = useState({
    responsavel: "",
    descricao: "",
    dataFim: "",
    status: "iniciado",
    tipo: 0,
  });

  const [colaborador, setColaborador] = useState({
    usuario: {
      nome: "",
      email: "",
      senha: "",
      nivel: 0,
      fotoPerfil: "",
    },
    ficha: {
      data_nascimento: "",
      naturalidade: "",
      nome_mae: "",
      nome_pai: "",
      cpf: "",
      carteira_identidade: "",
      expedidor_identidade: "",
      data_emissao_identidade: "",
      titulo_eleitor_numero: "",
      titulo_eleitor_zona: "",
      titulo_eleitor_secao: "",
      ctps_numero: "",
      ctps_serie: "",
      ctps_uf: "",
      ctps_data_emissao: "",
      pis_numero: "",
      pis_data_cadastro: "",
      carteira_habilitacao_numero: "",
      carteira_habilitacao_categoria: "",
      estado_civil: "",
      escolaridade: "",
      raca_cor: "",
      certificado_reservista_numero: "",
      certificado_reservista_categoria: "",
      nome_companheiro: "",
      endereco: "",
      endereco_numero: "",
      endereco_cep: "",
      endereco_complemento: "",
      endereco_cidade: "",
      endereco_bairro: "",
      endereco_uf: "",
      cargo: "",
      cbo: "",
      data_admissao: "",
      salario: "",
      contrato_experiencia: "",
      horario_trabalho: "",
      intervalo: "",
      descanso: "",
      horario_sabado: "",
      vale_transporte: false,
      informacoes_complementares: "",
    },
    habilidades: {
      habilidade: "",
      especialidade: "",
    },
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  // Função para voltar para a etapa anterior
  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  function showModal(modalType) {
    var element = document.getElementById(`modal${modalType}`);
    if (element) {
      element.classList.add("show-modal");
    }
  }

  function closeModal(
    modalId,
    setAtividade,
    setColaborador,
    setValidationErrors
  ) {
    var element = document.getElementById(modalId);
    element.classList.remove("show-modal");

    setAtividade({
      responsavel: "",
      descricao: "",
      dataFim: "",
      status: "iniciado",
      tipo: 0,
    });

    setColaborador({
      usuario: {
        nome: "",
        email: "",
        senha: "",
        nivel: 0,
        fotoPerfil: "",
      },
      ficha: {
        data_nascimento: "",
        naturalidade: "",
        nome_mae: "",
        nome_pai: "",
        cpf: "",
        carteira_identidade: "",
        expedidor_identidade: "",
        data_emissao_identidade: "",
        titulo_eleitor_numero: "",
        titulo_eleitor_zona: "",
        titulo_eleitor_secao: "",
        ctps_numero: "",
        ctps_serie: "",
        ctps_uf: "",
        ctps_data_emissao: "",
        pis_numero: "",
        pis_data_cadastro: "",
        carteira_habilitacao_numero: "",
        carteira_habilitacao_categoria: "",
        estado_civil: "",
        escolaridade: "",
        raca_cor: "",
        certificado_reservista_numero: "",
        certificado_reservista_categoria: "",
        nome_companheiro: "",
        endereco: "",
        endereco_numero: "",
        endereco_cep: "",
        endereco_complemento: "",
        endereco_cidade: "",
        endereco_bairro: "",
        endereco_uf: "",
        cargo: "",
        cbo: "",
        data_admissao: "",
        salario: "",
        contrato_experiencia: "",
        horario_trabalho: "",
        intervalo: "",
        descanso: "",
        horario_sabado: "",
        vale_transporte: false,
        informacoes_complementares: "",
      },
      habilidades: {
        habilidade: "",
        especialidade: "",
      },
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

  function handleColaboradorInputChange(event) {
    const { name, value } = event.target;
    setColaborador({
      ...colaborador,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm(atividade);

    if (Object.keys(errors).length === 0) {
      // Dados do formulário de atividade são válidos
      fetch("/cadastrarAtividade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(atividade),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro na solicitação");
          }
        })
        .then((data) => {
          console.log(data);
          closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setValidationErrors(errors);
    }
  }

  function handleColaboradorSubmit(event, type) {
    event.preventDefault();
    const errors = validateColaborador(colaborador);

    if (Object.keys(errors).length === 0) {
      // Dados do formulário de colaborador são válidos
      if (type === "usuario") {
        // Enviar dados do usuário
        fetch("/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(colaborador.usuario),
        })
          .then((response) => {
            if (response.ok) {
              // A solicitação foi bem-sucedida
              return response.json();
            } else {
              // A solicitação falhou
              throw new Error("Erro na solicitação");
            }
          })
          .then((data) => {
            // Lidar com a resposta do servidor, se houver
            console.log(data);
            closeModal(
              "modalColaborador",
              0,
              setColaborador,
              setValidationErrors
            );
          })
          .catch((error) => {
            // Lidar com erros de solicitação
            console.error(error);
          });
      } else if (type === "ficha") {
        // Enviar dados da ficha
        fetch("/cadastrarFicha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(colaborador.ficha),
        })
          .then((response) => {
            if (response.ok) {
              // A solicitação foi bem-sucedida
              return response.json();
            } else {
              // A solicitação falhou
              throw new Error("Erro na solicitação");
            }
          })
          .then((data) => {
            // Lidar com a resposta do servidor, se houver
            console.log(data);
            closeModal(
              "modalColaborador",
              0,
              setColaborador,
              setValidationErrors
            );
          })
          .catch((error) => {
            // Lidar com erros de solicitação
            console.error(error);
          });
      } else if (type === "habilidades") {
        // Enviar dados de habilidades
        fetch("/cadastrarHabilidades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(colaborador.habilidades),
        })
          .then((response) => {
            if (response.ok) {
              // A solicitação foi bem-sucedida
              return response.json();
            } else {
              // A solicitação falhou
              throw new Error("Erro na solicitação");
            }
          })
          .then((data) => {
            // Lidar com a resposta do servidor, se houver
            console.log(data);
            closeModal(
              "modalColaborador",
              0,
              setColaborador,
              setValidationErrors
            );
          })
          .catch((error) => {
            // Lidar com erros de solicitação
            console.error(error);
          });
      }
      closeModal();
      setCurrentStep(1);
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
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
          <button type="submit" className="submit-button">
            Cadastrar
          </button>
        </div>
      </form>
    );
  }

  // Componente para a etapa de informações pessoais
  function InformacoesPessoais(colaborador) {
    return (
      <div className="modalColab">
        <div className="caixinha">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={colaborador.usuario.nome}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.nome}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={colaborador.usuario.email}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.email}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={colaborador.usuario.senha}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.senha}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="nivel">Nível:</label>
          <select
            id="nivel"
            name="nivel"
            value={colaborador.usuario.nivel}
            onChange={handleColaboradorInputChange}
          >
            <option value="1">Nível 1</option>
            <option value="2">Nível 2</option>
            <option value="3">Nível 3</option>
          </select>
          <span className="error">{validationErrors.nivel}</span>
        </div>
        <div className="caixinha caixinha-foto">
          <label htmlFor="fotoPerfil">Foto de perfil:</label>
          <input
            type="file" // Alterado para o tipo "file"
            id="fotoPerfil" // Adicionei o id "fotoPerfil"
            name="fotoPerfil" // Adicionei o name "fotoPerfil"
            onChange={handleColaboradorInputChange} // Adicionei um novo manipulador de eventos para a mudança de fotoPerfil
          />
          <span className="error">{validationErrors.fotoPerfil}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="data_nascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={colaborador.ficha.data_nascimento}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.data_nascimento}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="naturalidade">Naturalidade:</label>
          <input
            type="text"
            id="naturalidade"
            name="naturalidade"
            value={colaborador.ficha.naturalidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.naturalidade}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="nome_mae">Nome da mãe:</label>
          <input
            type="text"
            id="nome_mae"
            name="nome_mae"
            value={colaborador.ficha.nome_mae}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.nome_mae}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="nome_pai">Nome do pai:</label>
          <input
            type="text"
            id="nome_pai"
            name="nome_pai"
            value={colaborador.ficha.nome_pai}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.nome_pai}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={colaborador.ficha.cpf} // Certifique-se de usar a propriedade correta
            onChange={handleColaboradorInputChange} // Certifique-se de usar o tip
          />
          <span className="error">{validationErrors.cpf}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="raca_cor">Raça/Cor:</label>
          <input
            type="text"
            id="raca_cor"
            name="raca_cor"
            value={colaborador.ficha.raca_cor}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.raca_cor}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="nome_companheiro">Nome do Companheiro(a):</label>
          <input
            type="text"
            id="nome_companheiro"
            name="nome_companheiro"
            value={colaborador.ficha.nome_companheiro}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.nome_companheiro}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={colaborador.ficha.endereco}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_numero">Número:</label>
          <input
            type="text"
            id="endereco_numero"
            name="endereco_numero"
            value={colaborador.ficha.endereco_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_numero}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_cep">CEP:</label>
          <input
            type="text"
            id="endereco_cep"
            name="endereco_cep"
            value={colaborador.ficha.endereco_cep}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_cep}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_complemento">Complemento:</label>
          <input
            type="text"
            id="endereco_complemento"
            name="endereco_complemento"
            value={colaborador.ficha.endereco_complemento}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_complemento}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_cidade">Cidade:</label>
          <input
            type="text"
            id="endereco_cidade"
            name="endereco_cidade"
            value={colaborador.ficha.endereco_cidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_cidade}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_bairro">Bairro:</label>
          <input
            type="text"
            id="endereco_bairro"
            name="endereco_bairro"
            value={colaborador.ficha.endereco_bairro}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_bairro}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="endereco_uf">UF:</label>
          <input
            type="text"
            id="endereco_uf"
            name="endereco_uf"
            value={colaborador.ficha.endereco_uf}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.endereco_uf}</span>
        </div>
      </div>
    );
  }

  // Componente para a etapa de informações de contato
  function InformacoesContato(colaborador) {
    return (
      <div className="modalColab">
        <div className="caixinha">
          <label htmlFor="carterira_identidade">RG:</label>
          <input
            type="text"
            id="carteira_identidade"
            name="carteira_identidade"
            value={colaborador.ficha.carteira_identidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.carteira_identidade}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="expedidor_identidade">
            Órgão Expedidor da Identidade:
          </label>
          <input
            type="text"
            id="expedidor_identidade"
            name="expedidor_identidade"
            value={colaborador.ficha.expedidor_identidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.expedidor_identidade}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="data_emissao_identidade">
            Data de Emissão da Identidade:
          </label>
          <input
            type="date"
            id="data_emissao_identidade"
            name="data_emissao_identidade"
            value={colaborador.ficha.data_emissao_identidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.data_emissao_identidade}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="titulo_eleitor_numero">
            Título de Eleitor - Número:
          </label>
          <input
            type="text"
            id="titulo_eleitor_numero"
            name="titulo_eleitor_numero"
            value={colaborador.ficha.titulo_eleitor_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.titulo_eleitor_numero}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="titulo_eleitor_zona">Zona:</label>
          <input
            type="text"
            id="titulo_eleitor_zona"
            name="titulo_eleitor_zona"
            value={colaborador.ficha.titulo_eleitor_zona}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.titulo_eleitor_zona}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="titulo_eleitor_secao">Seção:</label>
          <input
            type="text"
            id="titulo_eleitor_secao"
            name="titulo_eleitor_secao"
            value={colaborador.ficha.titulo_eleitor_secao}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.titulo_eleitor_secao}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="ctps_numero">CTPS - Número:</label>
          <input
            type="text"
            id="ctps_numero"
            name="ctps_numero"
            value={colaborador.ficha.ctps_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.ctps_numero}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="ctps_serie">CTPS - Série:</label>
          <input
            type="text"
            id="ctps_serie"
            name="ctps_serie"
            value={colaborador.ficha.ctps_serie}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.ctps_serie}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="ctps_uf">CTPS - UF:</label>
          <input
            type="text"
            id="ctps_uf"
            name="ctps_uf"
            value={colaborador.ficha.ctps_uf}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.ctps_uf}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="ctps_data_emissao">CTPS - Data de Emissão:</label>
          <input
            type="date"
            id="ctps_data_emissao"
            name="ctps_data_emissao"
            value={colaborador.ficha.ctps_data_emissao}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.ctps_data_emissao}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="pis_numero">PIS - Número:</label>
          <input
            type="text"
            id="pis_numero"
            name="pis_numero"
            value={colaborador.ficha.pis_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.pis_numero}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="pis_data_cadastro">PIS - Data de Cadastro:</label>
          <input
            type="date"
            id="pis_data_cadastro"
            name="pis_data_cadastro"
            value={colaborador.ficha.pis_data_cadastro}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.pis_data_cadastro}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="carteira_habilitacao_numero">
            Carteira de Habilitação - Número:
          </label>
          <input
            type="text"
            id="carteira_habilitacao_numero"
            name="carteira_habilitacao_numero"
            value={colaborador.ficha.carteira_habilitacao_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.carteira_habilitacao_numero}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="carteira_habilitacao_categoria">Categoria:</label>
          <input
            type="text"
            id="carteira_habilitacao_categoria"
            name="carteira_habilitacao_categoria"
            value={colaborador.ficha.carteira_habilitacao_categoria}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.carteira_habilitacao_categoria}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="estado_civil">Estado Civil:</label>
          <input
            type="text"
            id="estado_civil"
            name="estado_civil"
            value={colaborador.ficha.estado_civil}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.estado_civil}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="escolaridade">Escolaridade:</label>
          <input
            type="text"
            id="escolaridade"
            name="escolaridade"
            value={colaborador.ficha.escolaridade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.escolaridade}</span>
        </div>
      </div>
    );
  }

  // Componente para a etapa de habilidades
  function Habilidades(colaborador) {
    return (
      <div className="modalColab">
        <div className="caixinha">
          <label htmlFor="certificado_reservista_numero">
            Certificado Reservista - Número:
          </label>
          <input
            type="text"
            id="certificado_reservista_numero"
            name="certificado_reservista_numero"
            value={colaborador.ficha.certificado_reservista_numero}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.certificado_reservista_numero}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="certificado_reservista_categoria">Categoria:</label>
          <input
            type="text"
            id="certificado_reservista_categoria"
            name="certificado_reservista_categoria"
            value={colaborador.ficha.certificado_reservista_categoria}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.certificado_reservista_categoria}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="cargo">Cargo:</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={colaborador.ficha.cargo}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.cargo}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="cbo">CBO:</label>
          <input
            type="number"
            id="cbo"
            name="cbo"
            value={colaborador.ficha.cbo}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.cbo}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="data_admissao">Data de Admissão:</label>
          <input
            type="date"
            id="data_admissao"
            name="data_admissao"
            value={colaborador.ficha.data_admissao}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.data_admissao}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="salario">Salário:</label>
          <input
            type="number"
            id="salario"
            name="salario"
            value={colaborador.ficha.salario}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.salario}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="intervalo">Intervalo:</label>
          <input
            type="text"
            id="intervalo"
            name="intervalo"
            value={colaborador.ficha.intervalo}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.intervalo}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="descanso">Descanso:</label>
          <input
            type="text"
            id="descanso"
            name="descanso"
            value={colaborador.ficha.descanso}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.descanso}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="horario_sabado">
            Horário de Trabalho aos Sábados:
          </label>
          <input
            type="text"
            id="horario_sabado"
            name="horario_sabado"
            value={colaborador.ficha.horario_sabado}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.horario_sabado}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="vale_transporte">Vale Transporte:</label>
          <select
            id="vale_transporte"
            name="vale_transporte"
            value={colaborador.ficha.vale_transporte}
            onChange={handleColaboradorInputChange}
          >
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
          <span className="error">{validationErrors.vale_transporte}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="informacoes_complementares">
            Informações Complementares:
          </label>
          <input
            type="text"
            id="informacoes_complementares"
            name="informacoes_complementares"
            value={colaborador.ficha.informacoes_complementares}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">
            {validationErrors.informacoes_complementares}
          </span>
        </div>
        <div className="caixinha">
          <label htmlFor="habilidade">Habilidade:</label>
          <input
            type="text"
            id="habilidade"
            name="habilidade"
            value={colaborador.habilidades.habilidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.habilidade}</span>
        </div>
        <div className="caixinha">
          <label htmlFor="especialidade">Especialidade:</label>
          <input
            type="text"
            id="especialidade"
            name="especialidade"
            value={colaborador.habilidades.especialidade}
            onChange={handleColaboradorInputChange}
          />
          <span className="error">{validationErrors.especialidade}</span>
        </div>
      </div>
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
            <Table />
          </div>

          <div className="modal" id="modalAtividade">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={() =>
                  closeModal(
                    "modalAtividade",
                    setAtividade,
                    setColaborador,
                    setValidationErrors
                  )
                }
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
            <button
              className={styles.triggerColab}
              onClick={() => showModal("Colaborador")}
            >
              Cadastrar Colaborador
            </button>
            <Colab />
          </div>

          <div className="modal" id="modalColaborador">
            <div className="modal-content">
              <span
                className="close-button"
                onClick={() =>
                  closeModal(
                    "modalColaborador",
                    setAtividade,
                    setColaborador,
                    setValidationErrors
                  )
                }
              >
                &times;
              </span>

              <h2>Cadastrar Colaborador</h2>
              <form onSubmit={handleColaboradorSubmit}>
                <div>
                  {currentStep === 1 && InformacoesPessoais(colaborador)}
                  {currentStep === 2 && InformacoesContato(colaborador)}
                  {currentStep === 3 && Habilidades(colaborador)}

                  <div className="modalColab">
                    {currentStep > 1 && (
                      <button onClick={prevStep}>Anterior</button>
                    )}
                    {currentStep < 3 && (
                      <button onClick={nextStep}>Próxima</button>
                    )}

                    {currentStep === 3 && (
                      <button
                        onClick={handleColaboradorSubmit}
                        className="submit-button"
                        type="submit"
                      >
                        Cadastrar
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RecursosHumanos };
