import { Component } from 'react';
import './App.css';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';
// import { Link } from 'react-router-dom';
import "../../styles/home.css";
import carrinho1 from "../../assets/imagem-carrinho1.jpg";
import carrinho2 from "../../assets/imagem-carrinho2.jpg";
import carrinho3 from "../../assets/imagem-carrinho3.jpg";
import logo from "../../assets/logo.png";

import Header from '../../Component/Header/Header'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false
    };
  };

  // Função que faz a chamada para a API para realiza o login
  efetuaLogin = (event) => {
    // ignora o comportamento padrão do navegador (recarregar a página, por exemplo)
    event.preventDefault();

    this.setState({ erroMensagem: '', isLoading: true });

    axios.post('http://localhost:5000/api/Login', {
      email: this.state.email,
      senha: this.state.senha
    })

      // recebe todo o conteúdo da resposta da requisição na variável resposta
      .then(resposta => {
        // verifico se o status code dessa resposta é igual a 200
        if (resposta.status === 200) {
          // se sim, exibe no console do navegador o token do usuário logado,
          // console.log('Meu token é: ' + resposta.data.token);
          // salva o valor do token no localStorage
          localStorage.setItem('usuario-login', resposta.data.token);
          // e define que a requisição terminou
          this.setState({ isLoading: false });

          // define a variável base64 que vai receber o payload do token
          let base64 = localStorage.getItem('usuario-login').split('.')[1];
          // exibe no console do navegador o valor em base64
          console.log(base64);

          // exibe no console o valor decodificado de base64 para string
          // console.log(window.atob(base64));

          // exibe no console do navegador o valor da chave role
          // console.log( JSON.parse( window.atob(base64) ) );

          // console.log( parseJwt().role );

          // exibe as propriedades da página
          console.log(this.props);

          // verifica se o usuário logado é do tipo administrador
          if (parseJwt().role === '1') {
            this.props.history.push('/tiposeventos');
            console.log('estou logado: ' + usuarioAutenticado())
          }

          else {
            this.props.history.push('/meusEventos');
          }
        }
      })

      // Caso haja um erro,
      .catch(() => {
        // define o valor do state erroMensagem com uma mensagem personalizada
        this.setState({ erroMensagem: 'E-mail e/ou senha inválidos!', isLoading: false })
      })
  };

  atualizaStateCampo = (campo) => {
    // quando estiver digitando no campo username
    //                     email        :       adm@adm.com

    // quando estiver digitando no campo password
    //                     senha        :        senha123
    this.setState({ [campo.target.name]: campo.target.value })
  };
  render() {
    return (
      <div>
        <Header></Header>
        {/* <header  />
    
                
                </header> */}


        <section class="home" id="home">

          <div class="content">
            <h3>
              O Melhor dos Anúncios
            </h3>

            <p>
              Produtos nacionais e importados da mais alta qualidade
              com o menor preço!
            </p>

            <a href="#" class="btn">dê uma olhada !</a>
          </div>

        </section>

      </div>
    );
  }
}

