import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ChatPrivado() {
    const navigate = useNavigate();
    const { chatusuario } = useParams();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");

    const participantes = [
        { id: 1, nome: "João", avatar: "https://i.pravatar.cc/40?u=joao" },
        { id: 2, nome: "Maria", avatar: "https://i.pravatar.cc/40?u=maria" },
        { id: 3, nome: "Lucas", avatar: "https://i.pravatar.cc/40?u=lucas" },
        { id: 4, nome: "Ana", avatar: "https://i.pravatar.cc/40?u=ana" }
    ];

    const forum = [
        { id: 1, nome: "Games", avatar: "https://i.pravatar.cc/40?u=games" },
        { id: 2, nome: "Esportes", avatar: "https://i.pravatar.cc/40?u=esportes" },
        { id: 3, nome: "Noticias", avatar: "https://i.pravatar.cc/40?u=noticias" },
    ];
    const membro = participantes.find(p => p.nome === chatusuario);
    useEffect(() => {
        if (!usuario) {
            navigate("/");
        }

        // Buscar Fóruns do Backend
        async function carregarForuns() {
            try {
                const resposta = await fetch("http://localhost:3001/api/foruns");
                const dados = await resposta.json();
                setForuns(dados);
            } catch {
                console.error("Erro ao carregar fóruns...");
            }
        }

        carregarForuns();
    }, [usuario, navigate]);
    function logout() {
        localStorage.clear();
        navigate("/");
    }

    function foruns() {
        navigate('/Dashboard');
    }

    function Menu() {
        return (
            <div className="MenuPerfil">
                <p>Perfil</p>
                <p>Configurações</p>
                <p onClick={foruns}>Fóruns</p>
                <p onClick={logout}>Sair</p>
            </div>
        );
    }

    function MenuPerfilPrivado() {
        if (!membro) return <p className='MenuUsario'>Usuário não encontrado</p>;

        return (
            <div className='MenuUsario'>
                <img className='Chat-avatar' src={membro.avatar} alt="avatar" />
                <p>Nome:</p>
                <p>{membro.nome}</p>
            </div>
        )
    }

    function enviarMensagem() {
        if (!novaMensagem.trim()) return;

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
        <div className='ChatPrivado-container'>
            <form className='ChatPrivado-form'>
                <h1 className='ChatPrivado-titulo'>Chat Privado</h1>
                <h1 className='ChatPrivado-nome'>{membro ? membro.nome : "Desconhecido"}</h1>

                <div className='ChatPrivado-mensagens'>
                    {mensagens.map(msg => (
                        <div key={msg.id} className='ChatPrivado-mensagem'>
                            <img src={msg.avatar} alt={msg.usuario} className='ChatPrivado-avatar-mensagem' />
                            <div>
                                <p className='ChatPrivado-usuario-mensagem'>{msg.usuario}</p>
                                <p className='ChatPrivado-texto'>{msg.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='ChatPrivado-input'>
                    <input
                        type='text'
                        placeholder='Digite sua mensagem...'
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                enviarMensagem();
                            }
                        }}
                    />
                    <button
                        className='ChatPrivado-enviar'
                        type="button"
                        onClick={enviarMensagem}>
                        Enviar →
                    </button>
                </div>
            </form>

            <div className='ChatPrivado-usuario'>
                <img className='ChatPrivado-avatar' src={usuario?.avatar} alt="avatar" />
                <p className='ChatPrivado-perfil' onClick={() => setMenuPerfil(!MenuPerfil)}>
                    {usuario?.nome}
                </p>
                {MenuPerfil && <Menu />}
            </div>

            <div className='Chatprivado-perfil'>
                <MenuPerfilPrivado />
            </div>

            <div className='ChatPrivado-foruns-lateral'>
                <ul className='ChatPrivado-foruns-lista'>
                    {forum.map(salas => (
                        <li key={salas.id}
                            className='ChatPrivado-aba-foruns'
                            onClick={() => navigate(`/Chat/${salas.id}`)}>
                            <img src={salas.avatar} alt={salas.nome} className='ChatPrivado-avatar-forum' />
                            <p className='ChatPrivado-nome-forum'>{salas.nome}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChatPrivado;
