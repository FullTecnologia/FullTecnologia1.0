import React, { createContext, useContext, useReducer } from 'react';

// Defina o formato do contexto
const AuthContext = createContext();

// Função de provedor que envolve seu aplicativo
export const AuthProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    isAuthenticated: true,
                    user: null, // Você pode deixar como null se não precisar dessas informações aqui
                    token: action.payload.token,
                    id_usuario: action.payload.login.id_usuario, // Ajuste para acessar o id_usuario
                };
            case 'LOGOUT':
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    id_usuario: null, // Ajuste para definir como null durante o logout
                };
            default:
                return state;
        }
    };

    // UseReducer para gerenciar o estado de autenticação
    const [state, dispatch] = useReducer(reducer, {
        isAuthenticated: false,
        user: null,
        token: null,
        login: null,
    });

    console.log('Estado inicial do AuthProvider:', state);


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Função de gancho personalizada para facilitar o acesso ao contexto
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};
