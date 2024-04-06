// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';

const HeaderBack = () => {
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
                        <Link to="/recommend" className="header__logo">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <span className="header__tagline">Foodinator <br /> 🍔🍟 </span>
                        <ul className="header__nav" id="header__nav">
                        </ul>
                        <Link to="/" className="header__cta">
                            <button type="button">
                                <span>Home</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
 );
};

export default HeaderBack;
