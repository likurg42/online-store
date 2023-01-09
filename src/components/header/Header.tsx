import React from 'react';
import { Link } from 'react-router-dom';
import cl from './header.module.scss';
import logo from './header-images/logo.png';
import cart from './header-images/cart.jpg';

export default function Header() {
    return (
        <div className={cl.header}>
            <Link to="/">
                <img className={cl.logo} src={logo} alt="logo" />
            </Link>
            <Link to="/*">
                <img className={cl.cart} src={cart} alt="cart" />
            </Link>
        </div>
    );
}
