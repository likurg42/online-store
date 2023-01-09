import React, { useEffect, useMemo, useReducer } from 'react';
import reducer from '../reducers/filterReducer';
import useProductsContext from '../hooks/useProductsContext';
import {
    FILTER_PRODUCTS,
    LOAD_PRODUCTS,
    SET_VIEW,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    UPDATE_SORT,
    UPDATE_FILTERS_FROM_QUERY,
    CLEAR_FILTERS,
} from '../utils/actions';
import {
    FilterContextState,
    FilterContextInterface,
    FilterProviderProps,
    FilterContextDispatcherAction,
    ProductsContextInterface,
    FilterUtils,
} from '../types/contexts';

const initialState: FilterContextState = {
    filteredProducts: [],
    allProducts: [],
    brands: [],
    categories: [],
    minStock: 0,
    maxStock: 100,
    minPrice: 0,
    maxPrice: 100,
    filters: {
        productsListView: 'grid',
        sort: 'price-highest',
        text: '',
        brand: 'all',
        category: 'all',
        currMinPrice: 0,
        currMaxPrice: 0,
        currMinStock: 0,
        currMaxStock: 0,
    },
    queryFilters: {},
};

export const FilterContext = React.createContext<FilterContextInterface | null>(null);

export function FilterProvider(props: FilterProviderProps) {
    const { children } = props;
    const { products } = useProductsContext() as ProductsContextInterface;
    const [state, dispatch]: [FilterContextState, React.Dispatch<FilterContextDispatcherAction>] = useReducer(
        reducer,
        initialState,
    );

    useEffect(() => {
        if (products.length > 0) dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    const filterUtils: FilterUtils = useMemo(
        () => ({
            updateSort: (e) => {
                const { value } = e.target;
                dispatch({ type: UPDATE_SORT, payload: value });
            },
            setView: (e) => {
                const { value } = e.target;
                dispatch({ type: SET_VIEW, payload: value });
            },
            updateFilters: (e) => {
                const { name, value } = e.target;
                dispatch({
                    type: UPDATE_FILTERS,
                    payload: { name, value },
                });
            },
            updateFiltersFromQuery: (newFilters) => {
                dispatch({ type: UPDATE_FILTERS_FROM_QUERY, payload: newFilters });
            },
            clearFilters: () => {
                dispatch({ type: CLEAR_FILTERS, payload: initialState });
            },
        }),
        [],
    );

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS });
        dispatch({ type: SORT_PRODUCTS });
    }, [state.filters, state.queryFilters]);

    const context: FilterContextInterface = useMemo(() => ({ ...state, ...filterUtils }), [state, filterUtils]);

    return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>;
}
