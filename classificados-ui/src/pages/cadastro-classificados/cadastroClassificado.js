import Header from '../../Component/Header/Header';
import { Component } from 'react';
import axios from 'axios';
import { Script } from "../../services/script"
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { useState, useEffect } from "react";
import api from '../../services/api';
import { render } from '@testing-library/react';
import "../../styles/cadastroClassificado.css"


export default class cadastroClassificado extends Component {

    constructor(props) {
        super(props);

        //nome e valor inicial.
        this.state = {
            titulo: '',
            descricao: '',
            idClassificado: '',
            idUsuario: '',

            listaClassificados: [],
            listaUsuarios: [],

            isLoading: false,
        };
    }

    //funcao responsavel por fazer a requisicao e trazer a lista de tipos eventos.
    buscaTags = () => {
        //o método por padrão será o GET.
        axios('http://localhost:5000/api/tags', {
            headers: {
                //comunicação JWT, o padrao da api Bearer + token.
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                // caso a requisição retorno um status code 200
                if (resposta.status === 200) {
                    //atualiza o status listaTags como os dados obtidos.
                    this.setState({ listaTags: resposta.data });
                    console.log(this.state.listaTags);
                }
            })
            //caso ocorroa algum erro, mostra no console do navegador.
            .catch((erro) => console.log(erro));
    };



    //funcao responsavel por fazer a requisicao e trazer a lista de usuarios.
    buscarUsuarios = () => {
        axios('http://localhost:5000/api/Usuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaUsuarios: resposta.data });
                    console.log(this.state.listaUsuarios);
                }
            })
            .catch((erro) => console.log(erro));
    };

    buscarEtiquetas = () => {
        axios('http://localhost:5000/api/Etiquetas')
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaEtiquetas: resposta.data });
                    console.log(this.state.listaEtiquetas);
                }
            })
            .catch((erro) => console.log(erro));
    };

    atualizaStateCampo = (campo) => {
        // quando estiver digitando no campo username
        //                     email        :       adm@adm.com

        // quando estiver digitando no campo password
        //                     senha        :        teste123
        this.setState({ [campo.target.name]: campo.target.value });
    };

    componentDidMount() {
        console.log('WOOOOOOOOOW');
        this.buscarEtiquetas();
        this.buscarUsuarios();
        this.buscaTags();
    }

    //funcao que faz a chamada para a API, para cadastrar um evento.
    cadastrarEtiqueta = (event) => {
        //Ignora o comportamento padrao do navegador.
        event.preventDefault();
        //define que a requisicao esta em andamento.
        this.setState({ isLoading: true });

        let evento = {
            nomeEtiqueta: this.state.titulo,
            descricao: this.state.descricao,
            idTags: this.state.idTags,
            idUsuario: this.state.idUsuario,
        };

        axios
            .post('http://localhost:5000/api/Etiquetas', evento, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Classificado cadastrado!');
                    this.setState({ isLoading: false });
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false });
            })
            .then(this.buscarEtiquetas);
    };




    render() {
        return (
            <div>

                <Header />

                <main>
                    <section class="container-main container">
                        <div class="content">
                            <div class="cadastroForm">
                                <img class="img-ps5" src="../assets/Rectangle 5.png" alt="" />

                                <form method="post" enctype="multipart/form-data">
                                    <div>
                                        <input type="file" id="file" name="file" multiple />
                                    </div>
                                </form>

                                <div class="form">
                                    <input placeholder="Titulo do anúncio" type="text" name="titulo" value={this.state.titulo} onChange={this.atualizaStateCampo} />
                                    <input class="desc-anuncio" placeholder="Descrição do anúncio" type="text" name="descricao" value={this.state.descricao} onChange={this.atualizaStateCampo}  />

                                    {this.state.isLoading === true && (

                                    <button class="btnForm" type="submit">Cadastrar</button >
                                    )}
                                </div>
                            </div>

                        </div>

                    </section>
                </main>
            </div>
        )
    }


}