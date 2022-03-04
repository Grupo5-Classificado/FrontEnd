import { parseJwt, usuarioAutenticado } from '../../Services/auth.js';

import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Header extends Component {

    toggleMenu = () => {
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    }

    







    render() {
        return (
            <header className="header container">
                <a href="#" className="logoHeader">
                    <img src="../assets/logo.png" alt=""></img>
                </a>

                <nav className="navbar">
                    <a href="#home">Home</a>
                    <a href="#sobre">sobre</a>
                    <a href="#portfolio">classificados</a>
                    <a href="#produtos">Venda aqui !</a>
                </nav>

                <div className="icons">
                    <div className="icones-caixa">
                        <div className="fas fa-search" id="search-btn"> </div>
                        <div className="fas fa-shopping-cart" id="cart-btn"></div>
                        <div className="fas fa-user" id="user-btn"></div>
                        <div className="fas fa-bars" id="menu-btn"></div>
                    </div>
                </div>

                <div className="search-form">
                    <input type="search" id="search-box" placeholder="Pesquise Aqui..." />
                    <label for="search-box" className="fas fa-search"></label>
                </div>

                <div className="cart-items-container">


                    <div className="cart-item">
                        <span className="fas fa-times" />
                        <img src="../assets/imagem-carrinho1.jpg" />
                        <div className="content">
                            <h3>Item 1</h3>

                        </div>
                    </div>

                    <div className="cart-item">
                        <span className="fas fa-times"></span>
                        <img src="../assets/imagem-carrinho2.jpg" />
                        <div className="content">
                            <h3>Item 2</h3>

                        </div>
                    </div>

                    <div className="cart-item">
                        <span className="fas fa-times"></span>
                        <img src="../assets/imagem-carrinho3.jpg" />
                        <div className="content">
                            <h3>Item 3</h3>

                        </div>
                    </div>
                </div>

                <div className="user-form">
                    <div className="userLogin">
                        <span>Bem Vindo</span>
                        <h3>Login</h3>
                        <input placeholder="Digite seu Email" type="email" />
                        <h3>Senha</h3>
                        <input placeholder="Digite Sua Senha" type="password" />

                    </div>
                    <a href="#" className="btnLogin">Entrar</a>
                    <a href="#" className="btnLogin">Não tem uma conta? Cadastre-se!</a>
                </div>

                <script src="../js/script.js"></script>

            </header>


        )
    }
}