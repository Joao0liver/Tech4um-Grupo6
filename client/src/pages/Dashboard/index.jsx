import { useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';


function Dashboard() {
    const navigate = useNavigate()
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil ] = useState (false); // Estado para MenuPerfil
    const [foruns, setForuns] = useState([]); // Estado para Fóruns
    
    useEffect(()=>{
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

    async function criarForum() {
        try {
            const resposta = await fetch("http://localhost:3001/api/forum-cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, descricao })
            });

            const dados = await resposta.json();

            alert(dados.mensagem);
        } catch {
            alert("Erro ao criar Fórum...");
        }
    }

    function logout() {
        localStorage.removeItem("usuario");
        localStorage.clear;

        navigate("/");
    }
    
    function Menu(){
        
        return (
            <div className="MenuPerfil">
                <p>Perfil</p>
                <p>Configurações</p>
                <p>Foruns</p>
                <p onClick={logout}>Sair</p>
            </div>
        );
    }

    return (
        <div className='Dash-container'>
            <form className='Dash-form'>
                <h1 className='Dash-logo1'>Tech</h1>
                <div className='Dash-usuario'>
                    <img className='Dash-avatar' src={usuario?.avatar} alt="avatar"></img>
                    <p className='Dash-perfil' onClick={()=>setMenuPerfil(!MenuPerfil)} style={{cursor: 'pointer'}}>{usuario?.nome}</p> 
                    {MenuPerfil && Menu()} 
                </div>
                <p className='Dash-logo2'>4Um</p>
                <p className='Dash-inicio'>Opa!! <br />Sobre o que gostaria de falar hoje?</p>
                <div className='Dash-row'>
                    <input name='Dash-busca' type='text' />
                    <button type='button' onClick={() => navigate('/Chat')}>→</button>
                    <button type='button' className='Dash-botao2' onClick={() => navigate('/Foruns')}>Ou crie seu próprio 4um</button></div>
            </form>
            
            <div className='Card-container'>
                {foruns.map(forum=>(
                    <div key={ forum.idForum } className='Card' onClick={() => navigate(`/Chat/${forum.idForum}`)}>
                        <h3 className='Card-title'>{forum.nome}</h3>
                        <p>{forum.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Dashboard
