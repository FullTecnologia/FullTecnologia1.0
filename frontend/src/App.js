import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RecursosHumanos from './pages/RecursosHumanos/RecursosHumanos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Adicione a rota a seguir para redirecionar para a página de registro */}
        <Route path="/clique-aqui" element={<Navigate to="/register" />} />


        <Route path="/recursoshumanos" element={<RecursosHumanos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
