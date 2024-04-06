// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

const Header = () => {
 return (
    <header className="header">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__content">
                        <button className="header__btn" type="button" aria-label="header__nav">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <Link to="/" className="header__logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <span className="header__tagline">Foodinator <br /> 🍔🍟 </span>
                        <ul className="header__nav" id="header__nav">
                            {/* Navigation items can be added here */}
                        </ul>
                        <Link to="/recommend" className="header__cta">
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z"/>
                                </svg>
                                <span>Recommend Me!</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
 );
};

export default Header;
