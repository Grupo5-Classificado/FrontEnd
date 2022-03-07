import '../../styles/classificado.css'
import ps5 from '../../assets/imgleilao.png'
import Header from '../../Component/Header/Header'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../services/api'
import { parseJwt } from '../../services/auth'

export default function Classificado() {
    const [pedido, setPedido] = useState({
        idPedido: "",
        idUsuario: "",
        idUsuarioNavigation: {
            email: "",
            idTipoUsuario: "",
            idUsuario: "",
            nomeUsuario: "",
            popularidade: "",
            senha: "",
            telefone: "",
        },
        pedido1: "",
        titulo: ""
    })

    const [location, setLocation] = useLocation().pathname
    const [proposta, setProposta] = useState("")
    const [listaComentarios, setListaComentarios] = useState([])

    function GetPedido() {

        console.log("foi?")

        const idPedido = window.location.pathname.split("/")
        console.log(idPedido[2])

        api.get("/pedidos/" + idPedido[2])
            .then((resposta) => {
                if (resposta.status === 200) {

                    setPedido(
                        resposta.data
                    )
                    console.log(resposta.data)
                }
            })
            .catch((erro) => console.log(erro))


    }

    const txtComentario = (proposta) => {
        setProposta(proposta.target.value)
    }

    function abrirCampo() {
        let campo = document.getElementById("txtComentario")

        campo.style.display = "block"
    }

    function fecharCampo() {
        let campo = document.getElementById("txtComentario")

        campo.style.display = "none"
    }

    function ListarComentarios() {
        api.get("/comentarios")
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaComentarios(resposta.data.filter(comentario => comentario.idClassificado === parseInt(window.location.pathname.split("/")[2])))
                }
            })
            .catch((erro) => console.log(erro))
    }

    function AddComentario() {

        let txtComentario = {
            idUsuario: parseJwt().jti,
            idClassificado: parseInt(window.location.pathname.split("/")[2]),
            comentario1: proposta
        }

        api.post("/comentarios", txtComentario)
            .then((resposta) => {
                if (resposta.status === 201) {
                    ListarComentarios()
                }
            })
            .catch((erro) => console.log(erro))

    }

    useEffect(GetPedido, [])
    useEffect(ListarComentarios, [])

    return (

        <div >
            <Header></Header>
            <div className="main">
                <div class="nomeProd">
                    <h3>{pedido.titulo}</h3>
                </div>
                <div className='produto'>

                    <div class="imgProd">
                        <div>
                            <img src={ps5} alt="" />
                        </div>
                    </div>

                    <div class="descProd">
                        <h1>Informações</h1>
                        <div class="infoVend">
                            <div>
                                <h3>Nome do Vendedor</h3>
                                <p>{pedido.idUsuarioNavigation.nomeUsuario}</p>
                            </div>

                            <div>
                                <h3>Email de Contato</h3>
                                <p>{pedido.idUsuarioNavigation.email}</p>
                            </div>


                            <div>
                                <h3>Telefone de Contato</h3>
                                <p>{pedido.idUsuarioNavigation.telefone}</p>
                            </div>
                            <div>
                                <h3>Descrição</h3>
                                <p>{pedido.pedido1}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='boxProposta container'>
                    <h3>Propostas</h3>
                    <button onClick={() => abrirCampo()} className='btnCriar'>Criar proposta</button>
                    <div id='txtComentario' style={{ display: "none" }} className='campoProposta'>
                        <textarea
                            placeholder="Escreva aqui sua proposta"
                            name="comentario"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={x => txtComentario(x)}
                        />
                        <div className='btnAddCancel'>
                            <div>
                                <button onClick={() => fecharCampo()}>Cancelar</button>
                                <button onClick={() => AddComentario()}>Adicionar</button>
                            </div>
                        </div>
                    </div>

                    <div className="listaPropostas">
                        {
                            listaComentarios.map((comentario) => {
                                return (
                                    <div key={comentario.idComentario} className="proposta">
                                        <h3>{comentario.idUsuarioNavigation.nomeUsuario}</h3>
                                        <p>{comentario.comentario1}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>


        </div >

    )

}