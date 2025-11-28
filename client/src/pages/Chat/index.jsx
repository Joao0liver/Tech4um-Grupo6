import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Chat() {
    const { idForum } = useParams();
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil] = useState(false);

    // Estado para mensagens
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");

    // Estado para fóruns vindos do backend
    const [foruns, setForuns] = useState([]);
    const [salaAtual, setSalaAtual] = useState(null);

    useEffect(() => {
        if (!usuario) {
            navigate("/");
        }

        async function carregarForuns() {
            try {
                const resposta = await fetch("http://localhost:3001/api/foruns");
                const dados = await resposta.json();
                setForuns(dados);

                // Encontrar o fórum atual pelo id da URL
                const forumSelecionado = dados.find(f => f.idForum === Number(idForum));
                setSalaAtual(forumSelecionado);
            } catch {
                console.error("Erro ao carregar fóruns...");
            }
        }

        carregarForuns();
    }, [usuario, navigate, idForum]);

    function voltarDashboard() {
        navigate('/Dashboard');
    }

    function logout() {
        localStorage.removeItem("usuario");
        localStorage.clear();
        navigate("/");
    }

    function Menu() {
        return (
            <div className="MenuPerfil">
                <p>Perfil</p>
                <p>Configurações</p>
                <p onClick={voltarDashboard}>Foruns</p>
                <p onClick={logout}>Sair</p>
            </div>
        );
    }

    // Função para enviar mensagem
    function enviarMensagem() {
        if (novaMensagem.trim() === "") return;

        const mensagemObj = {
            id: mensagens.length + 1,
            usuario: usuario.nome,
            avatar: usuario.avatar,
            texto: novaMensagem
        };

        setMensagens([...mensagens, mensagemObj]);
        setNovaMensagem("");
    }

    return (
        <div className='Chat-container'>
            <form className='Chat-form' onSubmit={(e) => e.preventDefault()}>
                <h1 className='Chat-titulo'>Chat online</h1>
                <h1 className='Chat-nome'>
                    {salaAtual ? salaAtual.nome : "Sala não encontrada"}
                </h1>

                {/* Mensagens */}
                <div className='Chat-mensagens'>
                    {mensagens.map(msg => (
                        <div key={msg.id} className='Chat-mensagem'>
                            <img src={msg.avatar} alt={msg.usuario} className='Chat-avatar-mensagem' />
                            <div>
                                <p className='Chat-usuario-mensagem'>{msg.usuario}</p>
                                <p className='Chat-texto'>{msg.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='Chat-input'>
                    <input 
                        type='text' 
                        placeholder='Digite sua mensagem...' 
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                    />
                    <button 
                        className='Chat-enviar' 
                        type="button" 
                        onClick={enviarMensagem}>
                        Enviar →
                    </button>
                </div>
            </form>

            <div className='Chat-usuario'>
                <img className='Chat-avatar' src={usuario?.avatar} alt="avatar" />
                <p className='Chat-perfil' onClick={() => setMenuPerfil(!MenuPerfil)} style={{ cursor: 'pointer' }}>
                    {usuario?.nome}
                </p>
                {MenuPerfil && <Menu />}
            </div>

            {/* Lista lateral de fóruns */}
            <div className='Chat-foruns-lateral'>
                <ul className='Chat-foruns-lista'>
                    {foruns.map(f => (
                        <li key={f.idForum}
                            className='Chat-aba-foruns'
                            onClick={() => navigate(`/Chat/${f.idForum}`)}>
                            <p className='Chat-nome-forum'>{f.nome}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chat;
