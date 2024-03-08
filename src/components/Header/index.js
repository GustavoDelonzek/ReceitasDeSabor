import './style.css'
import { Link } from "react-router-dom";

import imagem from '../../assets/images/saute.png'

function Header() {

    return (
        <header>
            <nav className="navbar navbar-expand-md border-body cabecalho ">
                <div className="container ">
                    <Link to='/' href="" className="navbar-brand logo-titulo" reloadDocument>
                        <img src={imagem} alt="logo" width="46" height="46" className="d-inline-block align-text-center " />
                        <span className='titulo-modificar'>Receitas&Sabor</span>
                    </Link>
                    <ul class="nav">
                        <li class="nav-item">
                            <Link to='/favoritas' class="nav-link link-navegacao" href="#" reloadDocument>Minhas Receitas</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    );
}

export default Header;