import React from "react";
import { NavLink } from "react-router-dom";

// css
import styles from "./NavBar.module.css";

// assets
import LogoImage from "../../assets/Logo-Full-Engenharia.png";
import AvatarImage from "../../assets/avatar.png";

// contexts
import { useAuthState } from "../../contexts/AuthContext";

const NavBar = () => {
  const { nome } = useAuthState(); // Obtenha o estado de autenticação do contexto

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={LogoImage}
          alt="Logo da Empresa"
          className={styles.LogoImage}
        />
      </div>

      <div className={styles.userProfile}>
        <div>
          <img
            src={AvatarImage}
            alt="Avatar"
            className={styles.logoImageAvatar}
          />
          {/* Utilize o nome do usuário obtido do contexto */}
          <p>{nome}</p>
        </div>
      </div>

      <ul className={styles.linksList}>
        <li>
          <NavLink to="/home" activeClassName={styles.active}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/profissional" activeClassName={styles.active}>
            Profissional
          </NavLink>
        </li>

        <li>
          <NavLink to="/lider" activeClassName={styles.active}>
            Líder
          </NavLink>
        </li>

        <li>
          <NavLink to="/planejamento" activeClassName={styles.active}>
            Planejamento
          </NavLink>
        </li>

        <li>
          <NavLink to="/comercial" activeClassName={styles.active}>
            Comercial
          </NavLink>
        </li>

        <li>
          <NavLink to="/financeiro" activeClassName={styles.active}>
            Financeiro
          </NavLink>
        </li>

        <li>
          <NavLink to="/recursoshumanos" activeClassName={styles.active}>
            Recursos Humanos
          </NavLink>
        </li>

        <li>
          <NavLink to="/diretoria" activeClassName={styles.active}>
            Diretoria
          </NavLink>
        </li>

        <li>
          <NavLink to="/" activeClassName={styles.active}>
            Sair
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
