import React, { useReducer, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
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

const initalState = {
    areProductsLoading: false,
    isProductsError: false,
    products: [],
    featuredProducts: [],
    isSingleProductLoading: false,
    isSingleProductSuccess: false,
    isSingleProductError: false,
    singleProduct: {},
};

export const ProductsContext = React.createContext();

export function ProductsProvider(props) {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initalState);

    const fetchProducts = useCallback(
        async (url) => {
            dispatch({ type: GET_PRODUCTS_BEGIN });
            try {
                const res = await fetch(url);
                const data = await res.json();
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
        async (url, id) => {
            dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
            try {
                const res = await fetch(`${url}${id}`);
                const product = await res.json();
                dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
            } catch (error) {
                dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
            }
        },
        [dispatch],
    );

    const value = useMemo(() => ({ ...state, fetchSingleProduct }), [state, fetchSingleProduct]);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
