import axios from "axios";

const baseURL = "http://localhost:3003/api";

const handleResponse = (response) => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    console.error("Erro na solicitação:", response);
    return null;
  }
};

const handleError = (error) => {
  console.error("Erro na solicitação:", error);
  throw error;
};

export const dataAtividades = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/listarAtividade/${id}`);

    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const cadastrarAtividade = async (id_usuario, atividade) => {
  try {
    const res = await axios.post(
      `${baseURL}/cadastrarAtividade/${id_usuario}`,
      atividade
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const cadastrarUsuario = async (id_usuario, dadosUsuario) => {
  try {
    const response = await axios.post(
      `${baseURL}/cadastro/${id_usuario}`,
      dadosUsuario
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const cadastrarFicha = async (dadosFicha) => {
  try {
    const response = await axios.post(`${baseURL}/cadastrarFicha`, dadosFicha);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const cadastrarHabilidades = async (habilidades) => {
  try {
    const res = await axios.post(
      `${baseURL}/cadastrarHabilidades`,
      habilidades
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};
