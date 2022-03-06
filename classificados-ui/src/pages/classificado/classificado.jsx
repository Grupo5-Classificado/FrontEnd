import '../../styles/classificado.css'
import ps5 from '../../assets/img-ps5.png'
import Header from '../../Component/Header/Header'

export default function Classificado() {

    return (


        <div >
            <Header></Header>
            <div className="main">
                <div class="nomeProd">
                    <h3>PlayStation 5</h3>
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
                                <p>
                                    Lorem ipsum
                                </p>
                            </div>

                            <div>
                                <h3>Email de Contato</h3>
                                <p>LoremIpsum@teste.com</p>
                            </div>


                            <div>
                                <h3>Telefone de Contato</h3>
                                <p>(11)11111-1111</p>
                            </div>
                            <div>
                                <h3>Descrição</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis metus dignissim, posuere mauris eu, sollicitudin erat. Proin molestie purus nec neque convallis, quis consectetur est scelerisque</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='boxProposta container'>
                    <h3>Propostas</h3>
                    <button>Criar proposta</button>
                </div>

            </div>


            <div className="footer">

            </div>
        </div >

    )

}