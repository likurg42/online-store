import { CartItem } from '../types/contexts.d';
import { ADD_TO_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM } from '../utils/actions';
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
                    const newTotalProdcuts = acc.totalProducts + amount;
                    const newTotalAmount = acc.totalAmount + price * amount;
                    return { totalAmount: newTotalProdcuts, totalProdcuts: newTotalAmount };
                },
                { totalProducts: 0, totalAmount: 0 },
            );
            return { ...state, totalProducts, totalAmount };
        }
        default:
            throw new Error(`There is no such action ${action.type}`);
    }
}
