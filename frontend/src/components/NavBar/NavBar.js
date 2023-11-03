import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from "./NavBar.module.css";

import LogoImage from '../../assets/Logo-Full-Engenharia.png';
import AvatarImage from '../../assets/avatar.png';

const NavBar = ({ user, username, logout }) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={LogoImage} alt="Logo da Empresa" className={styles.LogoImage} />
            </div>

            <div className={styles.userProfile}>
                <div>
                    <img src={AvatarImage} alt="Avatar" />
                    <p>Usuário</p>
                </div>

                <div className={styles.userName}>
                    {user && <p>{username}</p>}
                </div>
            </div>

            <ul className={styles.linksList}>
                <li>
                    <NavLink to="/home" activeclass={styles.active}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/profissional" activeclass={styles.active}>
                        Profissional
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/lider" activeclass={styles.active}>
                        Líder
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/planejamento" activeclass={styles.active}>
                        Planejamento
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/comercial" activeclass={styles.active}>
                        Comercial
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/financeiro" activeclass={styles.active}>
                        Financeiro
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/recursoshumanos" activeclass={styles.active}>
                        Recursos Humanos
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/diretoria" activeclass={styles.active}>
                        Diretoria
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/" activeclass={styles.active}>
                        Sair
                    </NavLink>
                </li>

            </ul>

        </div>

    )
}

export default NavBar
