import { useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';

function Foruns() {
    const navigate = useNavigate()
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [MenuPerfil, setMenuPerfil ] = useState (false);
    const [nomeForum, setNomeForum] = useState("");
    const [descricaoForum, setDescricaoForum] = useState("");
    const [avatarForum, SetAvatarForum] = useState("");
    useEffect(() => {
        if (!usuario) {
            navigate("/");
        }
    })
    
    function LerAvatar(e) {
        const file = e.target.files[0];
        if (!file) return;

        const ler = new FileReader();
        ler.onload = () => {
            SetAvatarForum(ler.result);
        };

        ler.readAsDataURL(file);
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
                <input type='text'/>
                <p className="Forum-avatar">Adicione a imagem do seu forum:</p>
                <input type="file" accept="image/*" onChange={LerAvatar} />
                <button className='Forum-criar' type='button'>Criar</button>
            </form>
        </div>
    )
}
export default Foruns;