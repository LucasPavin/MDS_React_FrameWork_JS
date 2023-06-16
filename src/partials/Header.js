import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import '../scss/partials/Header.scss'; // Importez le fichier SCSS pour le style du Header

const Header = () => {
  return (
    <header className="header">
      <div className='header_section'>
        <div className="header_section_logo">
          <Link to='/'>
            <img src={logo} alt="Logo de tricount" />
          </Link>
        </div>
        <nav className="header_section_navigation">
            <ul className="header_section_navigation_nav-links">
            <li>
                <Link to="/connexion" className="header_section_navigation_nav-link">Connexion</Link>
            </li>
            <li>
                <Link to="/inscription" className="header_section_navigation_nav-link">Inscription</Link>
            </li>
            </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
