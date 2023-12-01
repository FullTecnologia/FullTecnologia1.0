import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '../src/contexts/AuthContext';

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecursosHumanos from "./pages/RecursosHumanos/RecursosHumanos";
import Home from "./pages/Home/Home";
import Profissional from "./pages/Profissional/Profissional";
import Lider from "./pages/Lider/Lider";
import Planejamento from "./pages/Planejamento/Planejamento";
import Comercial from "./pages/Comercial/Comercial";
import Financeiro from "./pages/Financeiro/Financeiro";
import Diretoria from "./pages/Diretoria/Diretoria";
import CadastrarColaborador from "./pages/RecursosHumanos/cadastrarColab";

function App() {
  return (
    <AuthProvider> {/* Adicione o AuthProvider aqui */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Adicione a rota a seguir para redirecionar para a página de registro */}
          <Route path="/clique-aqui" element={<Navigate to="/register" />} />

          <Route path="/recursoshumanos" element={<RecursosHumanos />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profissional" element={<Profissional />} />
          <Route path="/lider" element={<Lider />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="/comercial" element={<Comercial />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/diretoria" element={<Diretoria />} />

          <Route
            path="/cadastrarColaborador"
            element={<CadastrarColaborador />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
