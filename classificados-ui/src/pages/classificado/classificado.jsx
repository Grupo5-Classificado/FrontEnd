import '../../styles/classificado.css'
import ps5 from '../../assets/ps5.png'

export default function Classificado() {

    return (


        <div >

            <div className="main">

                <div class="produto">
                    <div class="imgProd">
                        <div class="nomeProd">
                            <h3>PlayStation 5</h3>
                        </div>
                        <div class="imgPeq">
                            <img src={ps5} alt="" />
                            <img src={ps5} alt="" />
                            <img src={ps5} alt="" />
                        </div>
                        <div>
                            <img src={ps5} alt="" />
                        </div>
                    </div>

                    <div class="descProd">
                        <h1>Contato</h1>
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

                        </div>
                    </div>
                </div>
            </div>

            <div className="footer">

            </div>
        </div >

    )

}