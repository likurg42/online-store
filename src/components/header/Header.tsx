import React from 'react';
import { Link } from 'react-router-dom';
import useFilterContext from '../../hooks/useFilterContext';
import style from './header.module.scss';
import logo from './header-images/logo.png';
import cart from './header-images/cart.jpg';
import { FilterContextInterface } from '../../types/contexts';

export default function Header() {
    const { clearFilters } = useFilterContext() as FilterContextInterface;
    return (
        <div className={style.header}>
            <div className={`${style.header__inner} container`}>
                <Link to="/" onClick={() => clearFilters()}>
                    <img className={style.logo} src={logo} alt="logo" />
                </Link>
                <Link to="/cart">
                    <img className={style.cart} src={cart} alt="cart" />
                </Link>
            </div>
        </div>
    );
}
