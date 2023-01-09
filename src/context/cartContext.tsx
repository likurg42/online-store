import React, { useMemo, useReducer, useEffect } from 'react';
import {
    Cart,
    CartContextDispatcherAction,
    CartContextInterface,
    CartContextState,
    CartContextUtils,
    CartProviderProps,
    Product,
} from '../types/contexts';
import { ADD_TO_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM } from '../utils/actions';

import reducer from '../reducers/cartReducer';

const getCartFromLocalStorage = (): Cart => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const initialState: CartContextState = {
    cart: getCartFromLocalStorage(),
    totalAmount: 0,
    totalProducts: 0,
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
        }),
        [],
    );

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
        dispatch({ type: COUNT_CART_TOTALS });
    }, [state.cart]);
    const context: CartContextInterface = useMemo(() => ({ ...state, ...cartUtils }), [state, cartUtils]);
    return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
}
