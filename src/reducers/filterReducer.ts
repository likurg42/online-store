import {
    FilterContextDispatcherAction,
    FilterContextState,
    Product,
    ProductsListView,
    Sort,
    Filters,
    QueryFilters,
} from '../types/contexts.d';
import {
    LOAD_PRODUCTS,
    SET_VIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    UPDATE_FILTERS_FROM_QUERY,
    CLEAR_FILTERS,
    UPDATE_QUERY_FILTERS,
} from '../utils/actions';
import sortProducts from '../utils/sortProducts';
import filterUnique from '../utils/filterUnique';

function filterReducer(state: FilterContextState, action: FilterContextDispatcherAction): FilterContextState {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            const products = action.payload as Product[];
            const maxPrice = Math.max(...products.map((product) => product.price)) + 100;
            const maxStock = Math.max(...products.map((product) => product.stock)) + 10;
            const brands = products.map((product) => product.brand).filter(filterUnique);
            const categories = products.map((product) => product.category).filter(filterUnique);
            return {
                ...state,
                allProducts: [...products],
                brands: ['all', ...brands],
                categories: ['all', ...categories],
                maxPrice,
                maxStock,
                filters: {
                    ...state.filters,
                },
            };
        }
        case SET_VIEW: {
            const productsListView = action.payload as ProductsListView;
            return {
                ...state,
                filters: { ...state.filters, productsListView },
                queryFilters: { ...state.queryFilters, productsListView },
            };
        }
        case UPDATE_SORT:
            return {
                ...state,
                filters: { ...state.filters, sort: action.payload as Sort },
                queryFilters: { ...state.queryFilters, sort: action.payload as Sort },
            };
        case SORT_PRODUCTS: {
            const filteredProducts = state.filteredProducts.sort((a, b) => sortProducts(a, b, state.filters.sort));
            return { ...state, filteredProducts };
        }
        case UPDATE_FILTERS: {
            const { name, value } = action.payload as { name: keyof Filters; value: string };

            if (name === 'currMinPrice') {
                const parsedValue = parseInt(value, 10);
                if (parsedValue) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }

            if (name === 'currMaxPrice') {
                const parsedValue = parseInt(value, 10) || state.maxPrice;
                if (parsedValue > state.filters.currMinPrice + 100) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }
            if (name === 'currMinStock') {
                const parsedValue = parseInt(value, 10);

                if (parsedValue < (state.filters.currMaxStock || state.maxStock) - 10) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }
            if (name === 'currMaxStock') {
                const parsedValue = parseInt(value, 10);

                if (parsedValue > state.filters.currMinStock + 10) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }

            return {
                ...state,
                filters: { ...state.filters, [name]: value },
            };
        }
        case UPDATE_QUERY_FILTERS: {
            const { name, value } = action.payload as { name: keyof Filters; value: string };

            if (
                value === 'all' ||
                value === '' ||
                parseInt(value, 10) === state.maxPrice ||
                parseInt(value, 10) === state.minPrice
            ) {
                const { [name]: deletedKey, ...newQueryFilters } = state.queryFilters;

                return { ...state, queryFilters: newQueryFilters };
            }

            return { ...state, queryFilters: { ...state.queryFilters, [name]: value } };
        }
        case FILTER_PRODUCTS: {
            const {
                allProducts,
                maxPrice,
                maxStock,
                filters: { text, brand, category, currMinPrice, currMaxPrice, currMaxStock, currMinStock },
            } = state;

            let filteredProducts = [...allProducts];

            if (text)
                filteredProducts = filteredProducts.filter(
                    ({ title, description, brand: productBrand, category: productCategory }) =>
                        title
                            .concat(description, productBrand, productCategory)
                            .toLowerCase()
                            .includes(text.toLowerCase()),
                );

            if (brand && brand !== 'all')
                filteredProducts = filteredProducts.filter((product) => brand === product.brand);

            if (category && category !== 'all')
                filteredProducts = filteredProducts.filter((product) => category === product.category);

            filteredProducts = filteredProducts
                .filter((product) => currMinPrice <= product.price && product.price <= (currMaxPrice || maxPrice))
                .filter((product) => currMinStock <= product.stock && product.stock <= (currMaxStock || maxStock));

            return {
                ...state,
                filteredProducts,
            };
        }
        case UPDATE_FILTERS_FROM_QUERY: {
            const queryFilters = action.payload as QueryFilters;
            const parsedFilters = {
                ...(queryFilters.text && queryFilters.text !== '' && { text: queryFilters.text }),
                ...(queryFilters.brand && queryFilters.brand !== 'all' && { brand: queryFilters.brand }),
                ...(queryFilters.category && queryFilters.category !== 'all' && { category: queryFilters.category }),
                ...(queryFilters.productsListView && { productsListView: queryFilters.productsListView }),
                ...(queryFilters.sort && { sort: queryFilters.sort }),
                ...(queryFilters.currMaxPrice && { currMaxPrice: parseInt(queryFilters.currMaxPrice, 10) }),
                ...(queryFilters.currMinPrice && { currMinPrice: parseInt(queryFilters.currMinPrice, 10) }),
                ...(queryFilters.currMinStock && { currMinStock: parseInt(queryFilters.currMinStock, 10) }),
                ...(queryFilters.currMaxStock && { currMaxStock: parseInt(queryFilters.currMaxStock, 10) }),
            } as Filters;

            return {
                ...state,
                queryFilters,
                filters: { ...state.filters, ...parsedFilters },
            };
        }
        case CLEAR_FILTERS: {
            const inititalState = action.payload as FilterContextState;
            return { ...state, filters: inititalState.filters, queryFilters: {} };
        }

        default: {
            throw new Error(`No Mathcing "${action.type}" - action type `);
        }
    }
}

export default filterReducer;
