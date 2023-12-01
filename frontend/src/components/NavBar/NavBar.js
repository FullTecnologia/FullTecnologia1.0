import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

// css
import styles from "./NavBar.module.css";

// assets
import LogoImage from '../../assets/Logo-Full-Engenharia.png';
import AvatarImage from '../../assets/avatar.png';

// hooks

import { fetchUserData } from '../../hooks/apiService';

const NavBar = ({ user, username, logout }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDataFromApi = await fetchUserData();

                console.log('Dados do usuário (NavBar):', userDataFromApi);

                setUserData(userDataFromApi);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={LogoImage} alt="Logo da Empresa" className={styles.LogoImage} />
            </div>

            <div className={styles.userProfile}>
                {userData && (
                    <div>
                        <img src={AvatarImage} alt="Avatar" className={styles.logoImageAvatar} />
                        <p>{userData.nome}</p>
                    </div>
                )}
                <div className={styles.userName}>{user && <p>{username}</p>}</div>
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
