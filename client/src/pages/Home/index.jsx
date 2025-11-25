import './style.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Home({ users }) {
    const navigate = useNavigate();

    const [nome, SetNome] = useState("");
    const [email, SetEmail] = useState("");
    const [senha, SetSenha] = useState("");

    async function Validar() {
        const resposta = await fetch("http://localhost:3001/api/usuario-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();
        if (dados.sucesso) {
            localStorage.setItem("usuario", JSON.stringify(dados.usuario));
            navigate("/Dashboard");
        } else {
            alert(dados.mensagem);
        }
    }

    return (
        <div className='Home-container'>
            <form className='Home-form'>
                <h1 className='Home-titulo'>Que bom ter você por aqui!</h1>
                <p className='texto'>Para participar é necessario fazer login</p>

                <p className='Home-names'>Nome</p>
                <input type='text' value={nome} onChange={(e) => SetNome(e.target.value)} />

                <p className='Home-emails'>E-mail</p>
                <input type='email' value={email} onChange={(e) => SetEmail(e.target.value)} />

                <p className='Home-senhas'>Senha</p>
                <input type="password" value={senha} onChange={(e)=> SetSenha(e.target.value)} />

                <div className='Home-buttons'>
                    <button type='button' onClick={Validar}>Entrar</button>
                    <button type='button' onClick={() => navigate('/Cadastro')}>Criar conta</button>
                </div>
            </form>
        </div>
    );
}

export default Home;
