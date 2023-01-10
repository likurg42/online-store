import React from 'react';
import { Link } from 'react-router-dom';
import useFilterContext from '../../hooks/useFilterContext';
import style from './header.module.scss';
import logo from './header-images/logo.png';
import cart from './header-images/cart.svg';
import { CartContextInterface, FilterContextInterface } from '../../types/contexts';
import useCartContext from '../../hooks/useCartContext';
import formatPrice from '../../utils/formatPrice';

export default function Header() {
    const { clearFilters } = useFilterContext() as FilterContextInterface;
    const { totalAmount, totalProducts } = useCartContext() as CartContextInterface;
    return (
        <div className={style.header}>
            <div className={`${style.header__inner} container`}>
                <Link to="/" onClick={() => clearFilters()}>
                    <img className={style.logo} src={logo} alt="logo" />
                </Link>
                <Link className={style.link} to="/cart">
                    <span className={style.cart}>
                        <img className={style.cart__icon} src={cart} alt="cart" />
                        <span className={style.cart__value}>{formatPrice(totalAmount)}</span>
                        <span className={style.cart__count}>{totalProducts}</span>
                    </span>
                </Link>
            </div>
        </div>
    );
}
