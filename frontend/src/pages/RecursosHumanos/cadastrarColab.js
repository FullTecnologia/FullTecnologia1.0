import React, { useState } from "react";
import {
  validateUsuario,
  validateFicha,
  validateHabilidades,
} from "../../hooks/validation";
import "./cadastroColab.css";
import { useNavigate } from "react-router-dom";

// contexts
import { useAuthState } from "../../contexts/AuthContext";

import {
  cadastrarUsuario,
  cadastrarFicha,
  cadastrarHabilidades,
} from "../../hooks/apiService";

function CadastrarColaborador() {
  const { id_usuario } = useAuthState();
  const navigate = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    nivel: 0,
    fotoPerfil: "",
  });

  const [dadosFicha, setDadosFicha] = useState({
    id_usuario: "",
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
  });

  const [habilidades, setHabilidades] = useState({
    id_usuario: "",
    habilidade: "",
    especialidade: "",
  });

  const [usuarioCadastrado, setUser] = useState(null);

  const [validationErrors, setValidationErrors] = useState({});

  const estadosCivis = [
    "Selecione um estado civil",
    "Solteiro(a)",
    "Casado(a)",
    "Divorciado(a)",
    "Viúvo(a)",
    "União Estável",
    "Outro",
  ];

  const cargos = [
    "Selecione um cargo",
    "Líder de Projeto",
    "Projetista",
    "Comercial",
    "Financeiro",
    "Recursos Humanos",
    "Diretoria",
    "Outro",
  ];

  const [showUserForm, setShowUserForm] = useState(true);
  const [showFichaButton, setShowFichaButton] = useState(false);
  const [showFichaForm, setShowFichaForm] = useState(false);
  const [showHabilidadesButton, setShowHabilidadesButton] = useState(false);
  const [showHabilidadesForm, setShowHabilidadesForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  async function handleUsuarioSubmit(event) {
    event.preventDefault();
    const errors = validateUsuario(dadosUsuario);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await cadastrarUsuario(id_usuario, dadosUsuario); // Usar a função de cadastro de usuário da API

        if (response) {
          setShowUserForm(false);
          setShowFichaButton(true); // Mostra o botão para inserir a ficha
          setCurrentStep(2); // Avança para a próxima etapa
          setUser(response.novoUsuario);
          setDadosFicha({
            ...dadosFicha,
            id_usuario: response.novoUsuario.id, // Definir o ID do novo usuário nas informações da ficha
          });
          setValidationErrors({});
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
  }

  function handleUsuarioChange(event) {
    const { name, value } = event.target;
    setDadosUsuario({ ...dadosUsuario, [name]: value });
  }

  async function handleFichaSubmit(event) {
    event.preventDefault();
    const errors = validateFicha(dadosFicha);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await cadastrarFicha(dadosFicha);

        // Verifica se a resposta foi bem-sucedida
        if (response) {
          console.log(response);
          setShowFichaForm(false);
          setHabilidades({
            ...habilidades,
            id_usuario: response.ficha.id_usuario,
          });
          setShowHabilidadesButton(true);
          setCurrentStep(4); // Atualiza o estado para mostrar o botão de inserir habilidades
          setValidationErrors({});
        }
      } catch (error) {
        console.error(error);
        // Lidar com erro no cadastro da ficha
      }
    } else {
      setValidationErrors(errors);
    }
  }

  function handleFichaChange(event) {
    const { name, value } = event.target;
    setDadosFicha({ ...dadosFicha, [name]: value });
  }

  function handleShowFicha() {
    setShowFichaForm(true);
    setShowFichaButton(false);
    setCurrentStep(3);
  }

  async function handleHabilidadesSubmit(event) {
    event.preventDefault();
    const errors = validateHabilidades(habilidades);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await cadastrarHabilidades(habilidades);

        if (response) {
          navigate("/recursoshumanos"); // Navegar para outra rota
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
  }

  function handleHabilidadesChange(event) {
    const { name, value } = event.target;
    setHabilidades({ ...habilidades, [name]: value });
  }

  function handleShowHabilidades() {
    setShowHabilidadesForm(true);
    setShowHabilidadesButton(false);
    setCurrentStep(5);
  }

  function handleClick() {
    // Navegar para outra rota
    navigate("/recursoshumanos");
  }

  function handleKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    const isValidInput = /^\d*,?\d*$/.test(keyValue);

    if (!isValidInput) {
      event.preventDefault();
    }
  }

  function permitirApenasNumeros(event) {
    const teclaPermitida = event.key;
    const regexApenasNumeros = /^[0-9\b]+$/;

    if (!teclaPermitida.match(regexApenasNumeros)) {
      event.preventDefault();
    }
  }

  function InformacoesUsuario(dadosUsuario) {
    return (
      <div className="modalColab">
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="nome">
              Nome:
            </label>
            <input
              className="form-input"
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome completo"
              value={dadosUsuario.nome}
              onChange={handleUsuarioChange}
            />
            <span className="error">{validationErrors.nome}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="email">
              E-mail:
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={dadosUsuario.email}
              onChange={handleUsuarioChange}
            />
            <span className="error">{validationErrors.email}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="senha">
              Senha:
            </label>
            <input
              className="form-input"
              type="password"
              id="senha"
              name="senha"
              value={dadosUsuario.senha}
              onChange={handleUsuarioChange}
            />
            <span className="error">{validationErrors.senha}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="nivel">
              Nível:
            </label>
            <select
              className="form-select"
              id="nivel"
              name="nivel"
              value={dadosUsuario.nivel}
              onChange={handleUsuarioChange}
            >
              <option value=" ">Selecione um Nível </option>
              <option value="1">Nível 1</option>
              <option value="2">Nível 2</option>
              <option value="3">Nível 3</option>
            </select>
            <span className="error">{validationErrors.nivel}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="fotoPerfil">
              Foto de perfil:
            </label>
            <input
              className="form-input"
              type="file" // Alterado para o tipo "file"
              id="fotoPerfil" // Adicionei o id "fotoPerfil"
              name="fotoPerfil" // Adicionei o name "fotoPerfil"
              onChange={handleUsuarioChange} // Adicionei um novo manipulador de eventos para a mudança de fotoPerfil
            />
            <span className="error">{validationErrors.fotoPerfil}</span>
          </div>
        </div>
        <button type="submit" onClick={handleUsuarioSubmit}>
          Cadastrar
        </button>
      </div>
    );
  }

  // Componente para a etapa de informações de contato
  function InformacoesFicha(dadosFicha, usuarioCadastrado) {
    return (
      <div className="modalColb">
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="nomeUsuario">
              Nome do Usuário:
            </label>
            <input
              className="form-input"
              type="text"
              id="nomeUsuario"
              name="nomeUsuario"
              value={usuarioCadastrado.nome}
              readOnly // Para tornar somente leitura
            />
          </div>
          <div>
            <label className="form-label" htmlFor="data_nascimento">
              Data de Nascimento:
            </label>
            <input
              className="form-input"
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={dadosFicha.data_nascimento}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.data_nascimento}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="naturalidade">
              Naturalidade:
            </label>
            <input
              className="form-input"
              type="text"
              id="naturalidade"
              name="naturalidade"
              value={dadosFicha.naturalidade}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.naturalidade}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="nome_mae">
              Nome da mãe:
            </label>
            <input
              className="form-input"
              type="text"
              id="nome_mae"
              name="nome_mae"
              placeholder="Nome completo"
              value={dadosFicha.nome_mae}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.nome_mae}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="nome_pai">
              Nome do pai:
            </label>
            <input
              className="form-input"
              type="text"
              id="nome_pai"
              name="nome_pai"
              placeholder="Nome completo"
              value={dadosFicha.nome_pai}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.nome_pai}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="cpf">
              CPF:
            </label>
            <input
              className="form-input"
              type="text"
              id="cpf"
              name="cpf"
              value={dadosFicha.cpf} // Certifique-se de usar a propriedade correta
              onChange={handleFichaChange} // Certifique-se de usar o tip
              placeholder="___.___.___-__"
              maxLength="14"
            />
            <span className="error">{validationErrors.cpf}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="raca_cor">
              Raça/Cor:
            </label>
            <select
              className="form-select"
              id="raca_cor"
              name="raca_cor"
              value={dadosFicha.raca_cor}
              onChange={handleFichaChange}
            >
              <option value="">Selecione a Raça/Cor</option>
              <option value="Branco">Branco</option>
              <option value="Negro">Negro</option>
              <option value="Pardo">Pardo</option>
              <option value="Amarelo">Amarelo</option>
              <option value="Indígena">Indígena</option>
              <option value="Outro">Outro</option>
            </select>
            <span className="error">{validationErrors.raca_cor}</span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="nome_companheiro">
              Nome do Companheiro(a):
            </label>
            <input
              className="form-input"
              type="text"
              id="nome_companheiro"
              name="nome_companheiro"
              placeholder="Nome completo"
              value={dadosFicha.nome_companheiro}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.nome_companheiro}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco">
              Endereço:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco"
              name="endereco"
              value={dadosFicha.endereco}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.endereco}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco_numero">
              Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_numero"
              name="endereco_numero"
              value={dadosFicha.endereco_numero}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">{validationErrors.endereco_numero}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco_cep">
              CEP:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_cep"
              name="endereco_cep"
              placeholder="_____-___"
              value={dadosFicha.endereco_cep}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">{validationErrors.endereco_cep}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco_complemento">
              Complemento:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_complemento"
              name="endereco_complemento"
              placeholder="Ex: Apto.3"
              value={dadosFicha.endereco_complemento}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.endereco_complemento}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco_cidade">
              Cidade:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_cidade"
              name="endereco_cidade"
              value={dadosFicha.endereco_cidade}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.endereco_cidade}</span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="endereco_bairro">
              Bairro:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_bairro"
              name="endereco_bairro"
              value={dadosFicha.endereco_bairro}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.endereco_bairro}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="endereco_uf">
              UF:
            </label>
            <input
              className="form-input"
              type="text"
              id="endereco_uf"
              name="endereco_uf"
              value={dadosFicha.endereco_uf}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.endereco_uf}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="carterira_identidade">
              RG:
            </label>
            <input
              className="form-input"
              type="text"
              id="carteira_identidade"
              name="carteira_identidade"
              placeholder="__.___.___"
              maxLength="8"
              value={dadosFicha.carteira_identidade}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">
              {validationErrors.carteira_identidade}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="expedidor_identidade">
              Órgão Expedidor da Identidade:
            </label>
            <input
              className="form-input"
              type="text"
              id="expedidor_identidade"
              name="expedidor_identidade"
              value={dadosFicha.expedidor_identidade}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.expedidor_identidade}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="data_emissao_identidade">
              Data de Emissão da Identidade:
            </label>
            <input
              className="form-input"
              type="date"
              id="data_emissao_identidade"
              name="data_emissao_identidade"
              value={dadosFicha.data_emissao_identidade}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.data_emissao_identidade}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="titulo_eleitor_numero">
              Título de Eleitor - Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="titulo_eleitor_numero"
              name="titulo_eleitor_numero"
              value={dadosFicha.titulo_eleitor_numero}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">
              {validationErrors.titulo_eleitor_numero}
            </span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="titulo_eleitor_zona">
              Zona:
            </label>
            <input
              className="form-input"
              type="text"
              id="titulo_eleitor_zona"
              name="titulo_eleitor_zona"
              value={dadosFicha.titulo_eleitor_zona}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">
              {validationErrors.titulo_eleitor_zona}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="titulo_eleitor_secao">
              Seção:
            </label>
            <input
              className="form-input"
              type="text"
              id="titulo_eleitor_secao"
              name="titulo_eleitor_secao"
              value={dadosFicha.titulo_eleitor_secao}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">
              {validationErrors.titulo_eleitor_secao}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="ctps_numero">
              CTPS - Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="ctps_numero"
              name="ctps_numero"
              value={dadosFicha.ctps_numero}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">{validationErrors.ctps_numero}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="ctps_serie">
              CTPS - Série:
            </label>
            <input
              className="form-input"
              type="text"
              id="ctps_serie"
              name="ctps_serie"
              value={dadosFicha.ctps_serie}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.ctps_serie}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="ctps_uf">
              CTPS - UF:
            </label>
            <input
              className="form-input"
              type="text"
              id="ctps_uf"
              name="ctps_uf"
              value={dadosFicha.ctps_uf}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.ctps_uf}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="ctps_data_emissao">
              CTPS - Data de Emissão:
            </label>
            <input
              className="form-input"
              type="date"
              id="ctps_data_emissao"
              name="ctps_data_emissao"
              value={dadosFicha.ctps_data_emissao}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.ctps_data_emissao}</span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="pis_numero">
              PIS - Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="pis_numero"
              name="pis_numero"
              value={dadosFicha.pis_numero}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.pis_numero}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="pis_data_cadastro">
              PIS - Data de Cadastro:
            </label>
            <input
              className="form-input"
              type="date"
              id="pis_data_cadastro"
              name="pis_data_cadastro"
              value={dadosFicha.pis_data_cadastro}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">{validationErrors.pis_data_cadastro}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="carteira_habilitacao_numero">
              Carteira de Habilitação - Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="carteira_habilitacao_numero"
              name="carteira_habilitacao_numero"
              value={dadosFicha.carteira_habilitacao_numero}
              onChange={handleFichaChange}
              onKeyPress={permitirApenasNumeros}
            />
            <span className="error">
              {validationErrors.carteira_habilitacao_numero}
            </span>
          </div>
          <div>
            <label
              className="form-label"
              htmlFor="carteira_habilitacao_categoria"
            >
              Categoria:
            </label>
            <input
              className="form-input"
              type="text"
              id="carteira_habilitacao_categoria"
              name="carteira_habilitacao_categoria"
              value={dadosFicha.carteira_habilitacao_categoria}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.carteira_habilitacao_categoria}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="estado_civil">
              Estado Civil:
            </label>
            <select
              className="form-select"
              id="estado_civil"
              name="estado_civil"
              value={dadosFicha.estado_civil}
              onChange={handleFichaChange}
            >
              {estadosCivis.map((estadoCivil, index) => (
                <option key={index} value={estadoCivil}>
                  {estadoCivil}
                </option>
              ))}
            </select>
            <span className="error">{validationErrors.estado_civil}</span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="escolaridade">
              Escolaridade:
            </label>
            <select
              className="form-select"
              id="escolaridade"
              name="escolaridade"
              value={dadosFicha.escolaridade}
              onChange={handleFichaChange}
            >
              <option value="">Selecione a Escolaridade</option>
              <option value="Sem escolaridade">Sem escolaridade</option>
              <option value="Ensino fundamental incompleto">
                Ensino fundamental incompleto
              </option>
              <option value="Ensino fundamental completo">
                Ensino fundamental completo
              </option>
              <option value="Ensino médio incompleto">
                Ensino médio incompleto
              </option>
              <option value="Ensino médio completo">
                Ensino médio completo
              </option>
              <option value="Ensino superior incompleto">
                Ensino superior incompleto
              </option>
              <option value="Ensino superior completo">
                Ensino superior completo
              </option>
              <option value="Pós-graduação">Pós-graduação</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>

            <span className="error">{validationErrors.escolaridade}</span>
          </div>
          <div>
            <label
              className="form-label"
              htmlFor="certificado_reservista_numero"
            >
              Certificado Reservista - Número:
            </label>
            <input
              className="form-input"
              type="text"
              id="certificado_reservista_numero"
              name="certificado_reservista_numero"
              value={dadosFicha.certificado_reservista_numero}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.certificado_reservista_numero}
            </span>
          </div>
          <div>
            <label
              className="form-label"
              htmlFor="certificado_reservista_categoria"
            >
              Categoria:
            </label>
            <input
              className="form-input"
              type="text"
              id="certificado_reservista_categoria"
              name="certificado_reservista_categoria"
              value={dadosFicha.certificado_reservista_categoria}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.certificado_reservista_categoria}
            </span>
          </div>
          <div>
            <label className="form-label" htmlFor="cargo">
              Cargo:
            </label>
            <select
              className="form-select"
              id="cargo"
              name="cargo"
              value={dadosFicha.cargo}
              onChange={handleFichaChange}
            >
              {cargos.map((cargo, index) => (
                <option key={index} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
            <span className="error">{validationErrors.cargo}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="cbo">
              CBO:
            </label>
            <input
              className="form-input"
              type="text"
              id="cbo"
              name="cbo"
              value={dadosFicha.cbo}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.cbo}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="data_admissao">
              Data de Admissão:
            </label>
            <input
              className="form-input"
              type="date"
              id="data_admissao"
              name="data_admissao"
              value={dadosFicha.data_admissao}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.data_admissao}</span>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="salario">
              Salário:
            </label>
            <input
              className="form-input"
              type="text"
              id="salario"
              name="salario"
              value={dadosFicha.salario}
              onChange={handleFichaChange}
              onKeyPress={handleKeyPress}
            />
            <span className="error">{validationErrors.salario}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="intervalo">
              Intervalo (HH:MM):
            </label>
            <input
              className="form-input"
              type="text"
              id="intervalo"
              name="intervalo"
              placeholder="Ex: 01:30"
              value={dadosFicha.intervalo}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.intervalo}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="descanso">
              Descanso (HH:MM):
            </label>
            <input
              className="form-input"
              type="text"
              id="descanso"
              name="descanso"
              placeholder="Ex: 00:45"
              value={dadosFicha.descanso}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.descanso}</span>
          </div>

          <div>
            <label className="form-label" htmlFor="horario_sabado">
              Horário de Trabalho aos Sábados (HH:MM):
            </label>
            <input
              className="form-input"
              type="text"
              id="horario_sabado"
              name="horario_sabado"
              placeholder="Ex: 00:45"
              value={dadosFicha.horario_sabado}
              onChange={handleFichaChange}
            />
            <span className="error">{validationErrors.horario_sabado}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="vale_transporte">
              Vale Transporte:
            </label>
            <select
              className="form-select"
              id="vale_transporte"
              name="vale_transporte"
              value={dadosFicha.vale_transporte}
              onChange={handleFichaChange}
            >
              <option value={true}>Selecione um alternativa</option>
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </select>
            <span className="error">{validationErrors.vale_transporte}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="informacoes_complementares">
              Informações Complementares:
            </label>
            <input
              className="form-input"
              type="text"
              id="informacoes_complementares"
              name="informacoes_complementares"
              value={dadosFicha.informacoes_complementares}
              onChange={handleFichaChange}
            />
            <span className="error">
              {validationErrors.informacoes_complementares}
            </span>
          </div>
        </div>
        <button type="submit" onClick={handleFichaSubmit}>
          Cadastrar
        </button>
      </div>
    );
  }

  // Componente para a etapa de habilidades
  function Habilidades(habilidades) {
    return (
      <div className="modalColb">
        <div className="form-row">
          <div>
            <label className="form-label" htmlFor="habilidade">
              Habilidade:
            </label>
            <input
              className="form-input"
              type="text"
              id="habilidade"
              name="habilidade"
              value={habilidades.habilidade}
              onChange={handleHabilidadesChange}
            />
            <span className="error">{validationErrors.habilidade}</span>
          </div>
          <div>
            <label className="form-label" htmlFor="especialidade">
              Especialidade:
            </label>
            <input
              className="form-input"
              type="text"
              id="especialidade"
              name="especialidade"
              value={habilidades.especialidade}
              onChange={handleHabilidadesChange}
            />
            <span className="error">{validationErrors.especialidade}</span>
          </div>
        </div>
        <button type="submit" onClick={handleHabilidadesSubmit}>
          Cadastrar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Cadastrar Colaborador</h2>
      <form className="form-container" onSubmit={handleUsuarioSubmit}>
        {currentStep === 1 && showUserForm && InformacoesUsuario(dadosUsuario)}
        {currentStep === 2 && showFichaButton && (
          <button type="submit" onClick={handleShowFicha}>
            Inserir Ficha
          </button>
        )}
        {currentStep === 3 &&
          showFichaForm &&
          InformacoesFicha(dadosFicha, usuarioCadastrado)}
        {currentStep === 4 && showHabilidadesButton && (
          <button type="submit" onClick={handleShowHabilidades}>
            Inserir Habilidades
          </button>
        )}
        {currentStep === 5 && showHabilidadesForm && Habilidades(habilidades)}
        <div>
          <button type="submit" onClick={handleClick}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarColaborador;
