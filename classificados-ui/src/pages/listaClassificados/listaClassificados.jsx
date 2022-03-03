import { useState, useEffect, useRef } from "react";
import "../../styles/listaClassificados.css"
import "../../styles/global.css"
import "https://code.iconify.design/2/2.1.2/iconify.min.js"
import imgUsuario from "../../assets/dafoe.jpg"
import imgClassificado from "../../assets/img-ps5.png"
import Lottie from "react-lottie";
import animationData from "../../assets/17304-star.json"
import api from "../../services/api";
import { parseJwt } from "../../services/auth";

export default function ListaClassificados() {
    const [listaClassificados, setListaClassificados] = useState([])
    const [animationState, setAnimationState] = useState({
        isStopped: true, isPaused: false
    });
    const [filtroCategorias, setFiltroCategorias] = useState([])

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    function FiltroCategoria(check) {

        if (check.target.checked === true) {
            setFiltroCategorias(filtroCategorias => [...filtroCategorias, check.target.value])
            console.log(filtroCategorias)
        }

        ListarClassificados()
        // else {
        //     setFiltroCategorias(filtroCategorias => (filtroCategorias.splice(filtroCategorias.indexOf(check.target.value), 1)))
        //     console.log(filtroCategorias)
        // }



        // let listaCategorias = ['']
        // listaCategorias.push(categoria)
        // setFiltroCategorias(listaCategorias)
    }

    function ListarClassificados() {
        // api.get('/classificados', {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('xxxxxxxxxxxxxxx'),
        //     }
        // })

        api.get('/classificados')
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaClassificados(resposta.data)
                }
            })
            .catch((erro) => console.log(erro))

        // if (filtroCategorias !== null) {
        //     let teste = listaClassificados.map((classificado) => {
        //         classificado === filtroCategorias.map((categoria) => { return categoria })
        //     })

        //     console.log(teste)
        // }

        
    }

    function FazerReserva(idPedidoEscolhido) {

        setAnimationState({
            ...animationState,
            isStopped: !animationState.isStopped
        })

        let reserva = {
            idUsuario: 2,
            idPedido: idPedidoEscolhido
        }

        api.post("/reserva", reserva
            // {
            //     headers: {
            //         Authorization: 'Bearer ' + localStorage.getItem('xxxxxxxxxxxxxxx'),
            //     }
            // }
        )
            .catch((erro) => {
                console.log(erro)
            })

            .then(ListaClassificados)
    }

    useEffect(ListarClassificados, [])

    return (
        <div>

            <section className="listaDemandas">
                <div className="listaDemandas__box container">
                    <h1>
                        Lista de demandas
                    </h1>


                    <div className="listaDemandas__boxDemandas">
                        <div className="listaDemandas__lista">
                            {
                                listaClassificados.map((classificado) => {
                                    return (
                                        <div id={classificado.id} key={classificado.id} className="listaDemandas__demanda">
                                            <img className="listaDemandas__imgDemanda" src={imgClassificado} alt="" />
                                            <div className="listaDemandas__conteudo">
                                                <div className="listaDemandas__tituloDemanda">
                                                    <img className="listaDemandas__imgPerfil" src={classificado.Imagem}
                                                        alt="" />
                                                    <h2>{classificado.Titulo}</h2>
                                                    <button className="animation" onClick={() => FazerReserva(classificado.id)}>
                                                        <Lottie options={defaultOptions}
                                                            height={60}
                                                            width={60}
                                                            isStopped={animationState.isStopped}
                                                            isPaused={animationState.isPaused} />
                                                    </button>
                                                </div>
                                                <p className="listaDemandas__descricao">
                                                    {classificado.Descricao}
                                                </p>
                                                <div className="listaDemandas__tags">
                                                    <div>
                                                        <p>Menos de R$ 7.000,00</p>
                                                        <p>São Paulo</p>
                                                        <p>Usado</p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            Ver mais
                                                        </p>
                                                        <span className="iconify-inline"
                                                            data-icon="akar-icons:circle-chevron-right-fill"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="listaDemandas__filtro">
                            <form action="">
                                <div className="listaDemandas__categorias">
                                    <h3>Categorias</h3>
                                    <ul>
                                        <li><input value="Beleza" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Beleza</li>
                                        <li><input value="Cultura" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Cultura</li>
                                        <li><input value="Eletrônicos" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Eletrônicos</li>
                                        <li><input value="Esportes" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Esportes</li>
                                        <li><input value="Comida" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Comida</li>
                                        <li><input value="Mercados" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Mercados</li>
                                        <li><input value="Pets" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Pets</li>
                                        <li><input value="Saúde" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Saúde</li>
                                        <li><input value="Serviços" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Serviços</li>
                                        <li><input value="Turismo" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Turismo</li>
                                        <li><input value="Veículos" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Veículos</li>
                                        <li><input value="Empregos" onClick={(x) => FiltroCategoria(x)} type="checkbox" />Empregos</li>
                                    </ul>
                                </div>
                                <div className="listaDemandas__regiao">
                                    <h3>Regiões</h3>
                                    <ul>
                                        <li><input type="checkbox" />São Paulo</li>
                                        <li><input type="checkbox" />Rio de Janeiro</li>
                                        <li><input type="checkbox" />Minas Gerais</li>
                                        <li><input type="checkbox" />Paraná</li>
                                        <li><input type="checkbox" />Mato Grosso</li>
                                        <li><input type="checkbox" />Espírito Santo</li>
                                        <li><input type="checkbox" />Bahia</li>
                                        <li><input type="checkbox" />Santa Catarina</li>
                                        <li><input type="checkbox" />Goiás</li>
                                        <li><input type="checkbox" />Pernambuco</li>
                                    </ul>
                                </div>
                                <div className="listaDemandas__preco">
                                    <h3>Preço</h3>
                                    <div>
                                        <div>
                                            <input type="text" placeholder="R$ Min." />
                                            <input type="text" placeholder="R$ Max." />
                                        </div>
                                    </div>
                                </div>
                                <button>Aplicar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}