// utils.js
export const formatData = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se for necessário
    return `${year}-${month}-${day}`;
};
