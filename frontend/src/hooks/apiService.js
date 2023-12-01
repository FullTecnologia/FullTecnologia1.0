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
        const response = await axios.get(`${baseURL}/listarAtividade/:${id}`);

        if (response.status === 404) {
            console.error("Error 404: Resource not found");
            return null;
        }

        return handleResponse(response);
    } catch (error) {
        console.error("Error in dataAtividades:", error);
        handleError(error);
    }
};

export const cadastrarAtividade = async (atividade, id_usuario) => {
    try {
        const response = await axios.post(`${baseURL}/cadastrarAtividade/:${id_usuario}`, {
            dadosAtividade: atividade,
        });

        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

