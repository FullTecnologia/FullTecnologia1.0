// apiService.js

import axios from 'axios';

const baseURL = 'http://localhost:3003/api';

const handleResponse = (response) => {
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        console.error('Erro na solicitação:', response);
        return null;
    }
};

const handleError = (error) => {
    console.error('Erro na solicitação:', error);
    throw error;
};

export const fetchDataFromAtividades = async () => {
    try {
        const response = await axios.get(`${baseURL}/listarAtividade`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const cadastrarAtividade = async (atividade) => {
    try {
        const response = await axios.post(`${baseURL}/cadastrarAtividade`, { dadosAtividade: atividade });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

// Adicione mais funções conforme necessário para outras operações na API
