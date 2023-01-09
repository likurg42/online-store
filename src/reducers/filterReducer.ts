import {
    FilterContextDispatcherAction,
    FilterContextState,
    Product,
    ProductsListView,
    Sort,
    Filters,
} from '../types/contexts.d';
import {
    LOAD_PRODUCTS,
    SET_VIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    UPDATE_FILTERS_FROM_QUERY,
    // CLEAR_FILTERS,
} from '../utils/actions';
import sortProducts from '../utils/sortProducts';

function filterReducer(state: FilterContextState, action: FilterContextDispatcherAction): FilterContextState {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            const products = action.payload as Product[];
            const maxPrice = Math.max(...products.map((product) => product.price)) + 100;
            const maxStock = Math.max(...products.map((product) => product.stock)) + 10;
            const brands = products.map((product) => product.brand).filter((v, i, a) => a.indexOf(v) === i);
            const categories = products.map((product) => product.category).filter((v, i, a) => a.indexOf(v) === i);
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

                if (parsedValue < state.filters.currMaxPrice - 100) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                        queryFilters: { ...state.queryFilters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }

            if (name === 'currMaxPrice') {
                const parsedValue = parseInt(value, 10);

                if (parsedValue > state.filters.currMinPrice + 100) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                        queryFilters: { ...state.queryFilters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }
            if (name === 'currMinStock') {
                const parsedValue = parseInt(value, 10);

                if (parsedValue < state.filters.currMaxStock - 10) {
                    return {
                        ...state,
                        filters: { ...state.filters, [name]: parsedValue },
                        queryFilters: { ...state.queryFilters, [name]: parsedValue },
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
                        queryFilters: { ...state.queryFilters, [name]: parsedValue },
                    };
                }

                return { ...state };
            }

            return {
                ...state,
                filters: { ...state.filters, [name]: value },
                queryFilters: { ...state.queryFilters, [name]: value },
            };
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
            const queryFilters = action.payload as { [key: string]: string };
            return {
                ...state,
                queryFilters: { ...state.queryFilters, ...queryFilters },
                filters: { ...state.filters, ...queryFilters },
            };
        }
        default:
            throw new Error(`No Mathcing "${action.type}" - action type `);
    }
}

export default filterReducer;
