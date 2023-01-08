import React from 'react';
import cl from './header.module.scss';
import logo from './header-images/logo.png';
import bag from './header-images/icon-bag.png';
import like from './header-images/icon-like.png';
import search from './header-images/icon-search.png';

export default function Header() {
    return (
        <div className={cl.header}>
            <div className={`${cl['header-inner']} container`}>
                <img className={cl.logo} src={logo} alt="logo" />
                <div className={cl.nav}>
                    <div>HOME</div>
                    <div>SHOP</div>
                    <div>BLOG</div>
                    <div>SALE</div>
                    <div>CONTACT US</div>
                    <img className={cl.search} src={search} alt="search" />
                    <div>SEARCH</div>
                </div>
                <div className={cl.account}>
                    <div>SING IN</div>
                    <div>CREATE IN ACCOUNT</div>
                    <img src={like} alt="like" />
                    <img src={bag} alt="bag" />
                    <div className="current-buy">
                        <div>Shoping Cart</div>
                        <div>
                            <span>0.00</span>
                            <span> EUR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
