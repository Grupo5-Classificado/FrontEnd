import '../../assets/css/Login.css'
import { parseJwt } from '../../services/auth';


import { Component } from "react";
import axios from 'axios';
import api from '../../services/api';
import Header from '../../Component/Header/Header';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'matheus@outlook.com',
            senha: 'Lili123321',
            erroMensagem: '',
            isLoading: false
        };
    };

    efetuaLogin = (event) => {
        this.setState({ erroMensagem: " ", isLoading: true })
        event.preventDefault();
        api.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta.data.token)
                    localStorage.setItem('usuario-token', resposta.data.token)
                    this.setState({ isLoading: false });



                    switch (parseJwt().role) {
                        case '1':
                            // verifica se o usuário logado é paciente
                            this.props.history.push('/listarUsuario');
                            break;
                        case '2':
                            // verifica se o usuário logado é  administrador
                            this.props.history.push('/listarAdm');
                            break;
                        case '3':

                        default:
                            this.props.history.push('/');
                            break;
                    }
                }
            })

            .catch(() => {
                this.setState({ isLoading: false });
                this.setState({ erroMensagem: "E-mail ou senha inválidos!" })
            })
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }

    render(){
        return(
            <div>
                <Header/>
            </div>
        )
    }
}