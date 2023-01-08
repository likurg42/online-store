import React, { useReducer, useMemo, useEffect, useCallback } from 'react';
import reducer from '../reducers/productsReducer';
import { PRODUCTS_URL } from '../utils/constants';
import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../utils/actions';

import {
    Product,
    ProductsContextState,
    ProductsContextInterface,
    ProductsProviderProps,
    ProductsContextDispatcherAction,
    ProductsResponse,
} from '../types/contexts';

const initalState: ProductsContextState = {
    areProductsLoading: false,
    isProductsError: false,
    products: [],
    isSingleProductLoading: false,
    isSingleProductSuccess: false,
    isSingleProductError: false,
    singleProduct: null,
};

export const ProductsContext = React.createContext<ProductsContextInterface | null>(null);

export function ProductsProvider(props: ProductsProviderProps) {
    const { children } = props;
    const [state, dispatch]: [ProductsContextState, React.Dispatch<ProductsContextDispatcherAction>] = useReducer(
        reducer,
        initalState,
    );

    const fetchProducts = useCallback(
        async (url: string) => {
            dispatch({ type: GET_PRODUCTS_BEGIN });
            try {
                const res = await fetch(url);
                const data: ProductsResponse = await res.json();
                const { products } = data;
                dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
            } catch (error) {
                dispatch({ type: GET_PRODUCTS_ERROR });
            }
        },
        [dispatch],
    );

    useEffect(() => {
        fetchProducts(PRODUCTS_URL);
    }, [fetchProducts]);

    const fetchSingleProduct = useCallback(
        async (url: string, id: keyof Product) => {
            dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
            try {
                const res = await fetch(`${url}${id}`);
                const product: Product = await res.json();
                dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
            } catch (error) {
                dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
            }
        },
        [dispatch],
    );

    const context: ProductsContextInterface = useMemo(
        () => ({ ...state, fetchSingleProduct }),
        [state, fetchSingleProduct],
    );

    return <ProductsContext.Provider value={context}>{children}</ProductsContext.Provider>;
}
