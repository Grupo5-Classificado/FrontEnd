import Header from '../../Component/Header/Header';
import { Component } from 'react';
import axios from 'axios';
import { Script } from "../../services/script"
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { useState, useEffect } from "react";
import api from '../../services/api';
import { render } from '@testing-library/react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";



export default class cadastroClassificado extends Component {

    constructor(props) {
        super(props);

        //nome e valor inicial.
        this.state = {
            titulo: '',
            descricao: '',
            idTag: 0,
            listaCategorias: []
        };
    }


    //funcao responsavel por fazer a requisicao e trazer a lista de tipos eventos.
    // buscaTags = () => {
    //     //o método por padrão será o GET.
    //     axios('http://localhost:5000/api/tags', {
    //         headers: {
    //             //comunicação JWT, o padrao da api Bearer + token.
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     })
    //         .then((resposta) => {
    //             // caso a requisição retorno um status code 200
    //             if (resposta.status === 200) {
    //                 //atualiza o status listaTags como os dados obtidos.
    //                 this.setState({ listaTags: resposta.data });
    //                 console.log(this.state.listaTags);
    //             }
    //         })
    //         //caso ocorroa algum erro, mostra no console do navegador.
    //         .catch((erro) => console.log(erro));
    // };

    // SalvarImagemFirebase = () => {


    //     const firebaseConfig = {
    //         apiKey: "AIzaSyD_mXEQFc_T5r39aKXFW7PeAex7RhNlPBM",
    //         authDomain: "leiloados-9a696.firebaseapp.com",
    //         projectId: "leiloados-9a696",
    //         storageBucket: "leiloados-9a696.appspot.com",
    //         messagingSenderId: "802004962969",
    //         appId: "1:802004962969:web:b6721dddadf3c5889c3208",
    //         measurementId: "G-TLMB0YMLXK"
    //     };

    //     const app = initializeApp(firebaseConfig);
    //     const analytics = getAnalytics(app);
    //     const storage = getStorage(firebaseApp);

    //     const nomeImagem = this.state.titulo

    //     const upload = storage.ref().child("imagens-pedidos").put()

    // }



    //funcao responsavel por fazer a requisicao e trazer a lista de usuarios.
    // buscarUsuarios = () => {
    //     axios('http://localhost:5000/api/Usuarios', {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     })
    //         .then((resposta) => {
    //             if (resposta.status === 200) {
    //                 this.setState({ listaUsuarios: resposta.data });
    //                 console.log(this.state.listaUsuarios);
    //             }
    //         })
    //         .catch((erro) => console.log(erro));
    // };

    // buscarEtiquetas = () => {
    //     axios('http://localhost:5000/api/Etiquetas')
    //         .then((resposta) => {
    //             if (resposta.status === 200) {
    //                 this.setState({ listaEtiquetas: resposta.data });
    //                 console.log(this.state.listaEtiquetas);
    //             }
    //         })
    //         .catch((erro) => console.log(erro));
    // };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };

    componentDidMount() {
        this.ListarCategorias()
    }

    //funcao que faz a chamada para a API, para cadastrar um evento.
    // cadastrarEtiqueta = (event) => {
    //     //Ignora o comportamento padrao do navegador.
    //     event.preventDefault();
    //     //define que a requisicao esta em andamento.
    //     this.setState({ isLoading: true });

    //     let evento = {
    //         nomeEtiqueta: this.state.titulo,
    //         descricao: this.state.descricao,
    //         idTags: this.state.idTags,
    //         idUsuario: this.state.idUsuario,
    //     };

    //     axios
    //         .post('http://localhost:5000/api/Etiquetas', evento, {
    //             headers: {
    //                 Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //             },
    //         })
    //         .then((resposta) => {
    //             if (resposta.status === 201) {
    //                 console.log('Classificado cadastrado!');
    //                 this.setState({ isLoading: false });
    //             }
    //         })
    //         .catch((erro) => {
    //             console.log(erro);
    //             this.setState({ isLoading: false });
    //         })
    //         .then(this.buscarEtiquetas);
    // };

    ListarCategorias = () => {
        api.get("/tags")
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ listaCategorias: resposta.data })
                }
            })
            .catch((erro) => console.log(erro))
    }

    Cadastrar = (event) => {
        event.preventDefault()
        console.log(parseJwt().jti)
        console.log(this.state.titulo)
        console.log(this.state.idTag)
        console.log(this.state.descricao)
        
        let pedido = {
            idUsuario: parseJwt().jti,
            titulo: this.state.titulo,
            idTag: this.state.idTag,
            pedido1: this.state.descricao
        }

        api.post("/pedidos", pedido)
            .then((resposta) => {
                if (resposta.status === 201) {
                    this.props.history.push("/listaClassificados")
                }
            })
            .catch((erro) => console.log(erro))

    }




    render() {
        return (
            <div>

                <Header />

                <main>
                    <section class="container-main inputsClassificado">
                        <div class="content">
                            <div class="cadastroForm">
                                <img class="img-ps5" src="../assets/Rectangle 5.png" alt="" />

                                <form method="post" enctype="multipart/form-data">
                                    <div>
                                        <input type="file" id="file" name="file" multiple />
                                    </div>
                                </form>

                                <form onSubmit={this.Cadastrar} class="form ">
                                    <input
                                        placeholder="Titulo do anúncio"
                                        type="text"
                                        name="titulo"
                                        value={this.state.titulo}
                                        onChange={this.atualizaStateCampo} />
                                    <textarea
                                        class="desc-anuncio"
                                        placeholder="Descrição do anúncio"
                                        type="text"
                                        name="descricao"
                                        value={this.state.descricao}
                                        onChange={this.atualizaStateCampo} />
                                    <select name='idTag' onChange={ this.atualizaStateCampo}> 
                                        <option selected disabled>Selecione uma categoria</option>
                                        {
                                            this.state.listaCategorias.map((categoria) => {
                                                return (
                                                    <option key={categoria.idTag} value={categoria.idTag}>{categoria.nomeTag}</option>
                                                )
                                            })
                                        }

                                    </select>


                                    <button class="btnForm" type="submit">Cadastrar</button >
                                </form>
                            </div>

                        </div>

                    </section>
                </main>
            </div>
        )
    }


}