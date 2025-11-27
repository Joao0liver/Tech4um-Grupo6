import { Navigate } from 'react-router-dom';
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

    useEffect(() => {
        if(!usuario){
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
    },  [usuario, navigate]);

    const [participantes] = useState([
        { id: 1, nome: "João", avatar: "https://i.pravatar.cc/40?u=joao" },
        { id: 2, nome: "Maria", avatar: "https://i.pravatar.cc/40?u=maria" },
        { id: 3, nome: "Lucas", avatar: "https://i.pravatar.cc/40?u=lucas" },
        { id: 4, nome: "Ana", avatar: "https://i.pravatar.cc/40?u=ana" }
    ]);

    const [forum] = useState([
        { id: 1, nome: "Games", avatar: "https://i.pravatar.cc/40?u=games" },
        { id: 2, nome: "Esportes", avatar: "https://i.pravatar.cc/40?u=esportes" },
        { id: 3, nome: "Noticias", avatar: "https://i.pravatar.cc/40?u=noticias" },
    ]);

    const salaAtual = forum.find(f => f.id === Number(idForum));

    function foruns() {
        navigate('/Dashboard')
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
                <p onClick={foruns}>Foruns</p>
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
                <div className="Chat-lateral">
                    <h1 className='Chat-membros'>Participantes</h1>
                    <ul className='Chat-lista'>
                        {participantes.map(membro => (
                            <li key={membro.id} className='Chat-participantes'>
                                <img src={membro.avatar} alt={membro.nome} className="Chat-avatar-membro" />
                                <p className='Chat-nome-membro'>{membro.nome}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <h1 className='Chat-titulo'>Chat online</h1>
                <h1 className='Chat-nome'>{salaAtual ? salaAtual.nome : "Sala não encontrada"}</h1>

                {/* Aqui exibimos as mensagens */}
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

            <div className='Chat-foruns-lateral'>
                <ul className='Chat-foruns-lista'>
                    {forum.map(salas => (
                        <li key={salas.id}
                            className='Chat-aba-foruns'
                            onClick={() => navigate(`/Chat/${salas.id}`)}>
                            <img src={salas.avatar} alt={salas.nome} className='Chat-avatar-forum' />
                            <p className='Chat-nome-forum'>{salas.nome}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chat;
