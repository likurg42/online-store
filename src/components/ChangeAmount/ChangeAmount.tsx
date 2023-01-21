import React from 'react';
import style from './ChangeAmount.module.scss';
import useCartContext from '../../hooks/useCartContext';
import { CartContextInterface } from '../../types/contexts';

export default function ChangeAmount({ id }: { id: number }) {
    const { cart, updateCartItemAmount, removeFromCart } = useCartContext() as CartContextInterface;
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
        return (
            <form className={style.changeAmount}>
                <button
                    className={style.changeAmount__btn}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        if (cartItem.amount - 1 === 0) {
                            removeFromCart(id);
                        } else {
                            updateCartItemAmount(id, cartItem.amount - 1);
                        }
                    }}
                >
                    -
                </button>
                <p>{cartItem.amount}</p>
                <button
                    className={style.changeAmount__btn}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        updateCartItemAmount(id, cartItem.amount + 1);
                    }}
                >
                    +
                </button>
            </form>
        );
    }

    return <div />;
}
