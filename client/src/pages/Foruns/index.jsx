import { useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';

function Foruns() {
    const navigate = useNavigate()
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil ] = useState (false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (!usuario) {
            navigate("/");
        }
    })

    async function criarForum(){
        try {
            const resposta = await fetch("http://localhost:3001/api/forum-cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao })
            });

            const dados = await resposta.json();

            alert(dados.mensagem);
            navigate('/Dashboard')
        } catch {
            alert("Erro ao criar Fórum...");
        }
    }
    
    function Menu() {
        return (
            <div className="MenuPerfil">
                <p>Perfil</p>
                <p>Configurações</p>
                <p>Foruns</p>
                <p onClick={() => {
                    navigate('/');
                }}>Sair</p>
            </div>
        );
    }

    return (
        <div className='Forum-container'>
            <form className='Forum-form'>
                <h1 className='Forum-title'>Crie seu forum!</h1>
                 <div className='Dash-usuario'>
                    <img className='Dash-avatar' src={usuario?.avatar} alt="avatar"></img>
                    <p className='Dash-perfil' onClick={()=>setMenuPerfil(!MenuPerfil)} style={{cursor: 'pointer'}}>{usuario?.nome}</p> 
                    {MenuPerfil && Menu()} 
                </div>
                <p className='Forum-nome'>Nome do forum:</p>
                <input type='text' onChange={(e)=> setNome(e.target.value)}/>
                <p className='Forum-descricao'>Descrição do forum:</p>
                <input type='text' onChange={(e)=> setDescricao(e.target.value)}/>
                <button className='Forum-criar' type='button' onClick={(criarForum)}>Criar</button>
            </form>
        </div>
    )
}
export default Foruns;