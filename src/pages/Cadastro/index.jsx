import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cadastro({ users, setUsers }) {

    const navigate = useNavigate();
    const [nome, SetNome] = useState("");
    const [email, SetEmail] = useState("");
    const [senha, SetSenha] = useState("");
    const [avatar, SetAvatar] = useState("");

    function LerAvatar(e) {
        const file = e.target.files[0];
        if (!file) return;

        const ler = new FileReader();
        ler.onload = () => {
            SetAvatar(ler.result); 
        };

        ler.readAsDataURL(file);
    }

    function CriarConta() {

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const existe_email = users.find((user) => user.email === email);
        if (existe_email) {
            alert("Email já utilizado!");
            return;
        }

        const existe_nome = users.find((user) => user.nome === nome);
        if (existe_nome) {
            alert("Nome já utilizado!");
            return;
        }

        const novoUsuario = {
            id: users.length + 1,
            nome,
            email,
            senha,
            avatar,
        };

        setUsers([...users, novoUsuario]);

        alert("Conta criada com sucesso!");
        navigate('/');
    }

    return (
        <div className='Home-container'>
            <form className='Home-form'>
                <h1 className='Home-titulo'>Crie sua conta</h1>

                <p className='Home-names'>Nome</p>
                <input type="text" value={nome} onChange={(e) => SetNome(e.target.value)} />

                <p className='Home-emails'>E-mail</p>
                <input type="email" value={email} onChange={(e) => SetEmail(e.target.value)} />

                <p className='Home-senhas'>Senha</p>
                <input type="password" value={senha} onChange={(e) => SetSenha(e.target.value)} />

                <p className="Home-avatar">Adicione seu avatar:</p>
                <input type="file" accept="image/*" onChange={LerAvatar} />

                <div className='Home-buttons'>
                    <button type='button' onClick={CriarConta}>Criar conta</button>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;
