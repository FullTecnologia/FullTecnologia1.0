import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../src/contexts/AuthContext';

import Login from "./pages/Login/Login";
import RecursosHumanos from "./pages/RecursosHumanos/RecursosHumanos";
import CadastrarColaborador from "./pages/RecursosHumanos/cadastrarColab";

function App() {
  return (
    <AuthProvider> {/* Adicione o AuthProvider aqui */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/recursoshumanos" element={<RecursosHumanos />} />

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
