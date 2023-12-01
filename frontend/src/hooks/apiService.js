import axios from "axios";
import jwt_decode from "jwt-decode";

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


export const fetchDataFromAtividades = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/listarAtividade/:${id}`);
        console.log("Response from fetchDataFromAtividades:", response);

        if (response.status === 404) {
            console.error("Error 404: Resource not found");
            return null;
        }

        return handleResponse(response);
    } catch (error) {
        console.error("Error in fetchDataFromAtividades:", error);
        handleError(error);
    }
};

export const cadastrarAtividade = async (atividade, id) => {
    try {
        const response = await axios.post(`${baseURL}/cadastrarAtividade/:${id}`, { // não funciona rota
            dadosAtividade: atividade,
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const fetchDataFromUsuario = async (id) => {
    try {
        console.log('Iniciando fetchDataFromUsuario, ID:', id);

        // Verificar se há um token
        if (!id) {
            throw new Error('ID do usuário não fornecido');
        }

        // Faça uma chamada à API para obter os dados do usuário com base no ID ou outras informações
        const userResponse = await axios.post(`${baseURL}/login/:${id}`);

        console.log('Dados do usuário recebidos:', userResponse.data);

        // Retorne os dados do usuário
        return handleResponse(userResponse);
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw error;
    }
};

export const fetchUserData = async () => {
    try {
        console.log('Iniciando fetchUserData');

        const token = localStorage.getItem('token');
        console.log('Token obtido:', token);

        if (token) {
            // Antes de decodificar o token
            console.log('Token antes de decodificar:', token);

            // Decodificar o token
            const decodedToken = jwt_decode(token);

            // Após decodificar o token
            console.log('Token decodificado:', decodedToken);

            const userId = decodedToken.id_usuario;
            console.log('ID do usuário obtido do token:', userId);

            const userResponse = await fetchDataFromUsuario(userId);
            console.log('Dados do usuário (fetchUserData):', userResponse.data);

            return userResponse.data; // Ajuste conforme a estrutura real da resposta
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
    }
};