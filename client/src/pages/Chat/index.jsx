import './style.css';
import { socket } from "../../socket.js";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Chat() {
    const { idForum } = useParams();
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil] = useState(false);
    const [mostrarParticipantes, setMostrarParticipantes] = useState(false);

    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");

    // Estado para fóruns vindos do backend
    const [foruns, setForuns] = useState([]);
    const [salaAtual, setSalaAtual] = useState(null);

    useEffect(() => {
        if (!usuario) {
            navigate("/");
        }

        // Entrar na sala do Fórum
        socket.emit("entrarSala", idForum);

        // Receber as mensagens
        socket.on("mensagem", (msg) => {
            setMensagens((prev) => [...prev, msg]);
        });

        // Limpa o listener ao sair do socket
        return () => socket.off("mensagem");

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
    function MenuParticipantes() {
        return (
            <div className="MenuMembros">
                <ul className='Chat-lista'>
                    {participantes.map(membro => (
                        <li key={membro.id} className='Chat-participantes' onClick={() => navigate(`/ChatPrivado/${membro.nome}`)}>
                            <img src={membro.avatar} alt={membro.nome} className="Chat-avatar-membro" />
                            <p className='Chat-nome-membro'>{membro.nome}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    function enviarMensagem() {
        if (novaMensagem.trim() === "") return;

        socket.emit("mensagem", {
            idForum,
            usuario: usuario.nome,
            avatar: usuario.avatar,
            texto: novaMensagem
        });
        setNovaMensagem("");
    }

    return (
        <div className='Chat-container'>
            <form className='Chat-form' onSubmit={(e) => e.preventDefault()}>
                <div className="Chat-lateral">
                    <h1 className='Chat-membros' onClick={() => setMostrarParticipantes(!mostrarParticipantes)}>Participantes</h1>
                    {mostrarParticipantes && <MenuParticipantes />}
                </div>

                <h1 className='Chat-titulo'>Chat online</h1>
                <h1 className='Chat-nome'>
                    {salaAtual ? salaAtual.nome : "Sala não encontrada"}
                </h1>

                {/* Mensagens */}
                <div className='Chat-mensagens'>
                    {mensagens.map((msg, i) => (
                        <div key={i} className='Chat-mensagem'>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); 
                                enviarMensagem();
                            }
                        }}


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
