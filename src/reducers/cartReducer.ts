import { CLEART_CART } from '../utils/actions';
import { CartItem } from '../types/contexts.d';
import {
    ADD_TO_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    UPDATE_CART_ITEM_AMOUNT,
    APPLY_PROMOCODE,
} from '../utils/actions';
import { CartContextState, CartContextDispatcherAction, Product } from '../types/contexts';

export default function filterReducer(state: CartContextState, action: CartContextDispatcherAction): CartContextState {
    switch (action.type) {
        case ADD_TO_CART: {
            const { id, amount, product } = action.payload as { id: number; amount: number; product: Product };
            const currItem = state.cart.find((i) => i.id === id);

            if (currItem) {
                const newCart = state.cart.map((cartItem) => {
                    const { stock } = cartItem;
                    if (cartItem.id === id) {
                        return {
                            ...cartItem,
                            amount: amount + cartItem.amount < stock ? amount + cartItem.amount : stock,
                        };
                    }

                    return cartItem;
                });

                return { ...state, cart: newCart };
            }

            const newCartItem: CartItem = {
                title: product.title,
                id,
                amount,
                image: product.thumbnail,
                price: product.price,
                stock: product.stock,
            };

            return { ...state, cart: [...state.cart, newCartItem] };
        }
        case REMOVE_CART_ITEM: {
            const id = action.payload as number;
            const newCart = state.cart.filter((cartItem) => cartItem.id !== id);
            return { ...state, cart: newCart };
        }
        case COUNT_CART_TOTALS: {
            const { totalProducts, totalAmount } = state.cart.reduce<{ [index: string]: number }>(
                (acc, cartItem) => {
                    const { amount, price } = cartItem;
                    const newTotalProducts = acc.totalProducts + amount;
                    const newTotalAmount = acc.totalAmount + price * amount;
                    return { totalAmount: newTotalAmount, totalProducts: newTotalProducts };
                },
                { totalProducts: 0, totalAmount: 0 },
            );
            return { ...state, totalProducts, totalAmount };
        }
        case UPDATE_CART_ITEM_AMOUNT: {
            const { id, value } = action.payload as { id: number; value: number };
            const newCart = state.cart.map((item) => {
                if (item.id === id) {
                    const newAmount = value <= item.stock && value > 0 ? value : item.amount;
                    return { ...item, amount: newAmount };
                }

                return item;
            });
            return { ...state, cart: newCart };
        }
        case CLEART_CART: {
            return { ...state, cart: [] };
        }
        case APPLY_PROMOCODE: {
            const { id, isActive } = action.payload as { id: number; isActive: boolean };
            const promocodes = state.promocodes.map((promocode) => {
                if (promocode.id === id) return { ...promocode, active: isActive };
                return promocode;
            });
            console.log(promocodes);

            return { ...state, promocodes };
        }
        default:
            throw new Error(`There is no such action ${action.type}`);
    }
}
