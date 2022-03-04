import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import '../../assets/css/header.css';

import ListaClassificados from "../../pages/listaClassificados/listaClassificados.jsx"

// import { Script } from "../../services/script"
import { Link } from 'react-router-dom';

export var teste = ""

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemPesquisado: 'gjdgjdfj'
        }
    }

    toggleMenu = () => {
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    };

    atualizarCampo = (campo) => {
        this.setState({
            [campo.target.name]: campo.target.value
        })

        teste = this.state.itemPesquisado
        console.log(teste)
    }

    listar = () => {

        console.log("logou")


        if (parseJwt() != null) {



            switch (parseJwt().role) {
                case '1':
                    window.location.href = "/classificados"
                    console.log('estou logado: ' + usuarioAutenticado())

                    break;
            }

        } else {
            alert("Usuario nao está logado.")
        }


    }

    navBar = () => {
        let navbar = document.getElementById('navbar')
        let cartItem = document.querySelector('.cart-items-container');
        let searchForm = document.querySelector('.search-form');
        let userForm = document.querySelector('.user-form');

        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
        userForm.classList.remove('active');
        console.log('teste');
    }

    searchBtn = () => {
        let navbar = document.getElementById('navbar')
        let cartItem = document.querySelector('.cart-items-container');
        let searchForm = document.querySelector('.search-form');
        let userForm = document.querySelector('.user-form');

        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
        userForm.classList.remove('active');
        console.log('teste');
    }

    cartBtn = () => {
        let navbar = document.getElementById('navbar')
        let cartItem = document.querySelector('.cart-items-container');
        let searchForm = document.querySelector('.search-form');
        let userForm = document.querySelector('.user-form');

        cartItem.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        userForm.classList.remove('active');
        console.log('teste');
    }

    userBtn = () => {
        let navbar = document.getElementById('navbar')
        let cartItem = document.querySelector('.cart-items-container');
        let searchForm = document.querySelector('.search-form');
        let userForm = document.querySelector('.user-form');

        userForm.classList.toggle('active');
        searchForm.classList.remove('active');
        navbar.classList.remove('active');
        cartItem.classList.remove('active');
        console.log('teste');
    }

    render() {
        return (
            <header className="header">



                <a href="#" className="logoHeader">
                    <img src="../assets/logo.png" alt="" />
                </a>

                <nav className="navbar" id="navbar">
                    <a href="#home">home</a>
                    <a href="#sobre">sobre</a>
                    <a href="#portfolio">classificados</a>
                    <a href="#produtos">venda aqui !</a>
                </nav>

                <div className="icons">
                    <div className="icones-caixa">
                        <div className="fas fa-search" id="search-btn" onClick={this.searchBtn} img="Vector.png" alt=""> </div>
                        <div className="fas fa-shopping-cart" id="cart-btn" onClick={this.cartBtn} img="vector-1.png"></div>
                        <div className="fas fa-user" id="user-btn" onClick={this.userBtn} img="vector-2.png" alt=""></div>
                        <div className="fas fa-bars" id="menu-btn" onClick={this.navBar}></div>
                    </div>
                </div>

                <div className="search-form">
                    <input
                        type="search"
                        id="search-box"
                        name="itemPesquisado"
                        placeholder="Pesquise Aqui..."
                        value={this.state.itemPesquisado}
                        onChange={this.atualizarCampo}

                    />
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

                <script src="../js/script.js"></script>
            </header>


        )
    }
}