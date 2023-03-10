import React, { useMemo, useReducer, useEffect } from 'react';
import {
    Cart,
    CartContextDispatcherAction,
    CartContextInterface,
    CartContextState,
    CartContextUtils,
    CartProviderProps,
    Product,
    PromoCode,
} from '../types/contexts';
import {
    ADD_TO_CART,
    CLEART_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    UPDATE_CART_ITEM_AMOUNT,
    APPLY_PROMOCODE,
} from '../utils/actions';

import reducer from '../reducers/cartReducer';

const getCartFromLocalStorage = (): Cart => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const getPromocodesFromLocalStorage = (): PromoCode[] => {
    const promocodes = localStorage.getItem('promocodes');
    return promocodes
        ? JSON.parse(promocodes)
        : [
              { id: 1, name: 'NEW20', discountValue: 20, active: false },
              { id: 2, name: 'PROMO10', discountValue: 10, active: false },
          ];
};

const initialState: CartContextState = {
    cart: getCartFromLocalStorage(),
    totalAmount: 0,
    totalProducts: 0,
    promocodes: getPromocodesFromLocalStorage(),
};

export const CartContext = React.createContext<CartContextInterface | null>(null);

export function CartProvider(props: CartProviderProps) {
    const { children } = props;
    const [state, dispatch]: [CartContextState, React.Dispatch<CartContextDispatcherAction>] = useReducer(
        reducer,
        initialState,
    );

    const cartUtils: CartContextUtils = useMemo(
        () => ({
            addToCart: (id: number, amount: number, product: Product) => {
                dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
            },
            removeFromCart: (id: number) => {
                dispatch({ type: REMOVE_CART_ITEM, payload: id });
            },
            updateCartItemAmount: (id: number, value: number) => {
                dispatch({ type: UPDATE_CART_ITEM_AMOUNT, payload: { id, value } });
            },
            togglePromocode: (id: number, isActive: boolean) => {
                dispatch({ type: APPLY_PROMOCODE, payload: { id, isActive } });
            },
            getCartFinalAmount: () => {
                const discountPercent = state.promocodes.reduce((acc, promocode) => {
                    if (promocode.active) {
                        return acc + promocode.discountValue;
                    }

                    return acc;
                }, 0);

                const discountValue = Math.floor((state.totalAmount / 100) * discountPercent);
                const finalAmount = state.totalAmount - discountValue;

                return { discountValue, finalAmount };
            },
            clearCart: () => {
                dispatch({ type: CLEART_CART });
            },
        }),
        [state],
    );

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
        dispatch({ type: COUNT_CART_TOTALS });
    }, [state.cart]);

    useEffect(() => {
        localStorage.setItem('promocodes', JSON.stringify(state.promocodes));
    }, [state.promocodes]);

    const context: CartContextInterface = useMemo(() => ({ ...state, ...cartUtils }), [state, cartUtils]);
    return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
}
