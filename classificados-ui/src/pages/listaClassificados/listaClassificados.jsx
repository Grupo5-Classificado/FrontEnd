import { useState, useEffect } from "react";
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

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

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
    }

    function animacaoLottie(idClassificado) {

        // Animated.timing(idClassificado.progress, {
        //     toValue: 1,
        //     duration: 5000,
        //     easing: Easing.linear,
        // }).start();

        setAnimationState({
            ...animationState,
            isStopped: !animationState.isStopped
        })
    }

    function FazerReserva(idPedidoEscolhido) {
        let reserva = {
            idUsuario: parseJwt().jti,
            idPedido: idPedidoEscolhido
        }

        api.post("/reservas", reserva, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('xxxxxxxxxxxxxxx'),
            }
        })
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
                                                    <button className="animation" onClick={() => animacaoLottie(classificado.id)}>
                                                        <Lottie options={defaultOptions}
                                                            height={60}
                                                            width={60}
                                                            progress={classificado.id.progress}
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
                                        <li><input type="checkbox" />Beleza</li>
                                        <li><input type="checkbox" />Cultura</li>
                                        <li><input type="checkbox" />Eletrônicos</li>
                                        <li><input type="checkbox" />Esportes</li>
                                        <li><input type="checkbox" />Comida</li>
                                        <li><input type="checkbox" />Mercados</li>
                                        <li><input type="checkbox" />Pets</li>
                                        <li><input type="checkbox" />Saúde</li>
                                        <li><input type="checkbox" />Serviços</li>
                                        <li><input type="checkbox" />Turismo</li>
                                        <li><input type="checkbox" />Veículos</li>
                                        <li><input type="checkbox" />Empregos</li>
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