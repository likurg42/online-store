import React from 'react';
import styles from './Header.module.scss';
import logo from './header-images/logo.png';
import bag from './header-images/icon-bag.png';
import like from './header-images/icon-like.png';
import search from './header-images/icon-search.png';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={`${styles['header-inner']} container`}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.nav}>
                    <div>HOME</div>
                    <div>SHOP</div>
                    <div>BLOG</div>
                    <div>SALE</div>
                    <div>CONTACT US</div>
                    <img className={styles.search} src={search} alt="search" />
                    <div>SEARCH</div>
                </div>
                <div className={styles.account}>
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
