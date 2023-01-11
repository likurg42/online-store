import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './CartPage.module.scss';
import useCartContext from '../../hooks/useCartContext';
import { CartContextInterface } from '../../types/contexts';
import { ChangeAmount, PaymentModal } from '../../components';
import formatPrice from '../../utils/formatPrice';

export default function CartPage() {
    const { cart, totalAmount, totalProducts, removeFromCart, clearCart } = useCartContext() as CartContextInterface;
    const location = useLocation();
    const [open, setModal] = useState(location.state?.open ?? false);
    const [pagination, setPagination] = useState({ currPage: 1, numberOfPages: 1, numberOfItemsOnPage: 3 });

    const getLastPage = useCallback((numberOfItems: number, cartLength: number) => {
        let lastPage = 0;
        let i = cartLength;
        do {
            i -= numberOfItems;
            lastPage += 1;
        } while (i > 0);

        return lastPage;
    }, []);

    const paginationHandler = (numberOfItems?: number, page?: number) => {
        const lastPage = getLastPage(numberOfItems || pagination.numberOfItemsOnPage, cart.length);

        if (numberOfItems && numberOfItems <= cart.length) {
            return setPagination((prev) => ({
                ...prev,
                numberOfItemsOnPage: numberOfItems,
                currPage: pagination.currPage > lastPage ? lastPage : pagination.currPage,
                numberOfPages: lastPage,
            }));
        }

        if (page && page <= lastPage) {
            return setPagination((prev) => ({ ...prev, currPage: page }));
        }

        return setPagination((prev) => ({
            ...prev,
            currPage: pagination.currPage > lastPage ? lastPage : pagination.currPage,
        }));
    };

    useEffect(() => {
        paginationHandler();
    }, [cart]);

    if (cart.length === 0) {
        return (
            <section className="main-section container">
                <h1>Your cart is Empty</h1>
            </section>
        );
    }

    return (
        <section className="main-section container">
            <main className={style.main}>
                <h1 className={style.h1}>Shopping Cart</h1>
                <div className={style.pagination}>
                    <label className={style.pagination__numberOfItems} htmlFor="numberOfItemsOnPage">
                        <span>Number of items</span>
                        <input
                            type="number"
                            min="1"
                            max={cart.length}
                            value={pagination.numberOfItemsOnPage}
                            id="numberOfItemsOnPage"
                            onChange={(e) => {
                                const { value } = e.target;
                                paginationHandler(parseInt(value, 10));
                            }}
                        />
                    </label>
                    <span className={style.pagination__currentPage}>Page: {pagination.currPage}</span>
                    <button
                        className={style.pagination__button}
                        type="button"
                        onClick={() => paginationHandler(undefined, pagination.currPage - 1)}
                    >
                        Previous Page
                    </button>
                    <button
                        className={style.pagination__button}
                        type="button"
                        onClick={() => paginationHandler(undefined, pagination.currPage + 1)}
                    >
                        Next Page
                    </button>
                </div>
                <div className={style.captions}>
                    <span>Preview</span>
                    <span>Title</span>
                    <span>Quantity</span>
                    <span>Price</span>
                </div>
                {cart
                    .filter((_, i) => {
                        const { currPage, numberOfItemsOnPage } = pagination;

                        const firstItemIndex = (currPage - 1) * numberOfItemsOnPage;
                        const lastItemIndex = currPage * numberOfItemsOnPage;
                        const index = i;
                        return index >= firstItemIndex && index < lastItemIndex;
                    })
                    .map((item) => {
                        const { title, image, id, price, stock, amount } = item;
                        return (
                            <div className={style.product} key={id}>
                                <div className={style['product__img-wrapper']}>
                                    <img className={style.product__img} src={image} alt={title} />
                                </div>
                                <h2 className={style.product__title}>{title}</h2>
                                <div className={style.product__counter}>
                                    <span>Left: {stock - amount}</span>
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
                        <div className={style['cart-form']}>
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
                        </div>
                        <div className={style['cart-form']}>
                            <div className={style['cart-form__inner']}>
                                <p className={style['cart-form__item']}>
                                    <span>Order Total</span>
                                </p>
                                <p className={style['cart-form__item']}>
                                    <span>Items: {totalProducts}</span>
                                    <span>{formatPrice(totalAmount)}</span>
                                </p>
                            </div>
                            <button
                                type="button"
                                className={style['cart-form__btn']}
                                onClick={() => {
                                    setModal(true);
                                }}
                            >
                                proceed to checkout
                            </button>
                        </div>
                        <PaymentModal
                            open={open}
                            onClose={() => {
                                setModal(false);
                            }}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
}
