import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import api from "../../services/api";
import '../../assets/css/header.css';
import { useHistory } from "react-router-dom";

import ListaClassificados from "../../pages/listaClassificados/listaClassificados.jsx"

// import { Script } from "../../services/script"
import { Link, withRouter } from 'react-router-dom';

export var teste = ""

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemPesquisado: 'gjdgjdfj',
            email: 'comum@comum.com',
            senha: 'teste321',
            listaReservados: []
        }
    }


    limparCampos = () => {
        this.setState({
            email: '',
            senha: ''
        })
    }

    logar = (event) => {
        event.preventDefault()

        api.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    localStorage.setItem('login-usuario-leiloados', resposta.data.token)
                    this.setState({
                        isLoading: false
                    })

                    this.props.history.push("/listaclassificados")

                }

            })

            .catch(
                erro => console.log(erro)
            )

        this.limparCampos()

    }

    toggleMenu = () => {
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    };

    atualizarCampo = (campo) => {
        this.setState({
            [campo.target.name]: campo.target.value
        })

        // teste = this.state.itemPesquisado
        // console.log(teste)
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


    listarReservas = () => {
        api.get("/reservas/listarminhas/" + parseJwt().jti)
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({
                        listaReservados: resposta.data
                    })
                }
            })
            .catch((erro) => console.log(erro))
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
        this.listarReservas()

    }

    desfazerReserva = (idReserva) => {
        this.listarReservas()
        api.delete("/reservas/" + idReserva)
            .catch((erro) => {
                console.log(erro)
            })
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
                    <Link to="/">
                        <a href="#home">Home</a>
                    </Link>
                    <a href="#sobre">Sobre</a>
                    <Link to="/listaclassificados">
                        <a href="#portfolio">Demandas</a>
                    </Link>
                    <Link to="/cadastroclassificado">
                        <a href="#produtos">Anuncie aqui!</a>
                    </Link>
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

                    {
                        this.state.listaReservados.map((reserva) => {
                            return (
                                <div key={reserva.idReserva} id={reserva.idReserva} className="cart-item">
                                    <span onClick={() => this.desfazerReserva(reserva.idReserva)} className="fas fa-times" />
                                    <div className="content">
                                        <h3>{reserva.idClassificadoNavigation.titulo}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }


                    <a href="#" className="btnCart">Comprar</a>

                </div>

                <div className="user-form">
                    <div className="userLogin">
                        <span>Bem Vindo</span>
                        <form onSubmit={this.logar} className="formLogin" action="">
                            <h3>Login</h3>
                            <input
                                placeholder="Digite seu Email"
                                name="email"
                                type="text"
                                value={this.state.email}
                                onChange={this.atualizarCampo}
                            />

                            <h3>Senha</h3>
                            <input
                                placeholder="Digite Sua Senha"
                                name="senha"
                                type="password"
                                value={this.state.senha}
                                onChange={this.atualizarCampo}
                            />

                            <button type="submit" className="btnLogin">Entrar</button>
                            <Link to="/cadastro" style={{ width: "100%" }}>
                                <a href="#" className="btnLogin">Não tem uma conta? Cadastre-se!</a>
                            </Link>
                        </form>

                    </div>

                </div>

                <script src="../js/script.js"></script>
            </header>


        )
    }
}

export default withRouter(Header);