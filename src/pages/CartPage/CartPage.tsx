import React from 'react';
import { Link } from 'react-router-dom';
import style from './CartPage.module.scss';
import useCartContext from '../../hooks/useCartContext';
import { CartContextInterface } from '../../types/contexts';
import { ChangeAmount } from '../../components';
import formatPrice from '../../utils/formatPrice';

export default function CartPage() {
    const { cart, totalAmount, totalProducts, removeFromCart, clearCart } = useCartContext() as CartContextInterface;

    return (
        <section className="main-section container">
            <main className={style.main}>
                <h1 className={style.h1}>Shopping Cart</h1>
                <div className={style.captions}>
                    <span>Preview</span>
                    <span>Title</span>
                    <span>Quantity</span>
                    <span>Price</span>
                </div>
                {cart.map((item) => {
                    const { title, image, id, price } = item;
                    return (
                        <div className={style.product} key={id}>
                            <div className={style['product__img-wrapper']}>
                                <img className={style.product__img} src={image} alt={title} />
                            </div>
                            <h2 className={style.product__title}>{title}</h2>
                            <div className={style.product__counter}>
                                <ChangeAmount id={id} />
                            </div>
                            <b className={style.product__price}>{formatPrice(price)}</b>
                            <button
                                className={style.product__remove}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeFromCart(id);
                                }}
                            >
                                &#10006;
                            </button>
                        </div>
                    );
                })}
                <div className={style['control-section']}>
                    <div className={style.buttons}>
                        <button
                            className={style.btn}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                clearCart();
                            }}
                        >
                            clear shopping cart
                        </button>
                        <Link to="/" className={style.btn} type="button">
                            continue shopping
                        </Link>
                    </div>
                    <div className={style['forms-section']}>
                        <form className={style['cart-form']}>
                            <div className={style['cart-form__inner']}>
                                <p className={style['cart-form__item']}>
                                    <span>Apply Discount Code</span>
                                </p>
                                <p className={style['cart-form__item']}>
                                    <input className={style['cart-form__input']} type="text" placeholder="Promocode" />
                                </p>
                            </div>
                            <button type="button" className={style['cart-form__btn']}>
                                apply promocode
                            </button>
                        </form>
                        <form className={style['cart-form']}>
                            <div className={style['cart-form__inner']}>
                                <p className={style['cart-form__item']}>
                                    <span>Order Total</span>
                                </p>
                                <p className={style['cart-form__item']}>
                                    <span>Items: {totalProducts}</span>
                                    <span>{formatPrice(totalAmount)}</span>
                                </p>
                            </div>
                            <button type="button" className={style['cart-form__btn']}>
                                proceed to checkout
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
}
