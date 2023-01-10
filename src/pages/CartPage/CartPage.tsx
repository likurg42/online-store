import React from 'react';
import cl from './CartPage.module.scss';

export default function CartPage() {
    return (
        <section>
            <main className={cl.main}>
                <h1 className={cl.h1}>Shopping Cart</h1>
                <div className={cl.captions}>
                    <span>Product</span>
                    <span>Price</span>
                    <span>Size</span>
                    <span>Quantity</span>
                    <span>Total</span>
                </div>
                <div className={cl.product}>
                    <div className={cl.product__img}>test</div>
                    <div className={cl.product__title}>test</div>
                    <div className={cl.product__price}>test</div>
                    <div className={cl.product__size}>test</div>
                    <div className={cl.product__counter}>
                        <span className={cl.product__decrement}>&#8722;</span>
                        <span className={cl.product__result}>1</span>
                        <span className={cl.product__increment}>&#43;</span>
                    </div>
                    <div className={cl.product__total}>test</div>
                    <div className={cl.product__remove}>&#10006;</div>
                </div>
                <div className={cl.buttons}>
                    <button className={cl.btn} type="button">
                        continue shopping
                    </button>
                    <button className={cl.btn} type="button">
                        clear shopping cart
                    </button>
                </div>
            </main>
        </section>
    );
}
