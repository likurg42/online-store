import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.scss';
import logo from './header-images/logo.png';
import cart from './header-images/cart.jpg';

export default function Header() {
    return (
        <div className={style.header}>
            <div className={`${style.header__inner} container`}>
                <Link to="/">
                    <img className={style.logo} src={logo} alt="logo" />
                </Link>
                <Link to="/cart">
                    <img className={style.cart} src={cart} alt="cart" />
                </Link>
            </div>
        </div>
    );
}
