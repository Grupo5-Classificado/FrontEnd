import react from "react";
import '../../styles/cadastro.css'

export default function Cadastro() {
    
    return(

        <div className='main'>
             <div class="cadastroForm">
            <div class="logo">
                <h1>LEILOADOS</h1>
            </div>
                <form action="cadastro.html" class="form">
                    <p>Nome</p>
                    <input placeholder="Digite seu Nome Completo" required type="text"/>
                    <p>Email</p>
                    <input type="email" placeholder="Digite seu Email" required/>
                    <p>Telefone</p>
                    <input type="tel" placeholder="(XX)XXXX-XXXX"
                    pattern="[0-9]{2} [0-9]{5} [0-9]{4}" required />
                    <p>Senha</p>
                    <input type="password" placeholder="Digite sua Senha" required/>
                    <p>Confirme sua senha</p>
                    <input type="password" placeholder="Confirme sua Senha" required/>
                <div class="botao">
                    <button class="btnForm" type="submit">Cadastre-se</button>
                </div>
            
                </form>
            </div>

            <div className="footer">
            <h2>LEILOADOS Todos os Direitos Reservados</h2>
            </div>
        </div>

    )

}