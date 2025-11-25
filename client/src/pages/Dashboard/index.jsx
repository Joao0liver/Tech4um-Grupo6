import { useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';


function Dashboard() {
    const navigate = useNavigate()
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil ] = useState (false);
    
    useEffect(()=>{
        if(!usuario){
            navigate("/");
        }
    })

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
    const cards = [
        { id: 1, title: "Hardware", description: "Ajuda com PCs e peças." },
        { id: 2, title: "Programação", description: "Dúvidas de código." },
        { id: 3, title: "Jogos", description: "Fale sobre games." },
        { id: 4, title: "Noticias", description: "Noticias do dia a dia" },
        { id: 5, title: "Previsão do tempo", description: "Mostrando a previsão do tempo da sua região." },
        { id: 6, title: "Esportes", description: "Fale sobre esportes." }
    ];
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
                    <button type='button' className='Dash-botao2' onClick={()=> navigate('/Foruns')}>Ou crie seu próprio 4um</button></div>
            </form>
            <div className='Card-container'>{cards.map(card=>(
                <div key={card.id} className='Card' onClick={()=>navigate('/Chat/${card.id}')}>
                    <h3 className='Card-title'>{card.title}</h3>
                    <p>{card.description}</p>
                </div>
            ))}</div>
        </div>
    )
}
export default Dashboard
