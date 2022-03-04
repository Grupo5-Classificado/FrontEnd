import { parseJwt, usuarioAutenticado } from '../../services/auth';
import '../../assets/css/header.css';

import { Script } from "../../services/script"

import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Header extends Component {
    toggleMenu = () => {
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    }

    listar = () => {

        console.log("logou")


        if (parseJwt() != null) {



            switch (parseJwt().role) {
                case '1':
                    // verifica se o usuário logado é do tipo paciente
                    window.location.href = "/classificados"
                    console.log('estou logado: ' + usuarioAutenticado())

                    break;
            }

        } else {
            alert("Usuario nao está logado.")
        }


    }


    render() {
        return (
            <header className="header container">


                <a href="#" className="logoHeader">
                    <img src="../assets/logo.png" alt="" />
                </a>

                <nav className="navbar">
                    <a href="#home">home</a>
                    <a href="#sobre">sobre</a>
                    <a href="#portfolio">classificados</a>
                    <a href="#produtos">venda aqui !</a>
                </nav>

                <div className="icons">
                    <div className="icones-caixa">
                        <div className="fas fa-search" id="search-btn" img="Vector.png" alt=""> </div>
                        <div className="fas fa-shopping-cart" id="cart-btn" img="vector-1.png"></div>
                        <div className="fas fa-user" id="user-btn" img="vector-2.png" alt=""></div>
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

                    <a href="#" className="btnCart">Comprar</a>

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

            </header>

        )
    }
}