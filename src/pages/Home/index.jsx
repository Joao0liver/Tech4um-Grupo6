import './style.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Home() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([
        { id: 1, nome: "Muryllo", email: "muryllo@gmail.com" },
        { id: 2, nome: "Joao", email: "joao@email.com" },
    ]);
    const [nome, SetNome] = useState("");
    const [email, SetEmail] = useState("");
    const [cadastro, SetCadastro] = useState("");

    function Validar() {
        const existe = users.find(
            user => user.nome == nome && user.email == email
        );
        if (existe) {
            navigate('/Dashboard')
        }
        else {
            alert("Usuario Invalido!!")
        }
    }
    function CriarConta() {
        if (!nome || !email) {
            alert("preencha todos os campos!!");
            return;
        }
        const existe = users.find(
            user => user.email == email

        );
        if (existe) {
            alert("email já utilizado!!!")
            return;
        }
        const novoUsuario = {
            id: users.length + 1,
            nome,
            email
        };
        setUsers([...users, novoUsuario]);
        alert("conta criada com sucesso!! seja bem-vindo!");
        SetNome("");
        SetEmail("");
        SetCadastro(false);
    }


    return (
        <div className='Home-container'>
            <form className='Home-form'>
                <h1 className='Home-titulo'>Que bom ter você por aqui!</h1>
                <p className='texto'>Para participar é necessario fazer login</p>
                <p className='Home-names'>Nome</p>
                <input name='nome' type='text' value={nome} onChange={(e) => SetNome(e.target.value)} />
                <p className='Home-emails'>E-mail</p>
                <input name='email' type='email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                <div className='Home-buttons'>
                    <button type='button' onClick={Validar}>Entrar</button>
                    <button type='button' onClick={CriarConta}>Criar conta</button>
                </div>
            </form>
        </div>
    )
}

export default Home
