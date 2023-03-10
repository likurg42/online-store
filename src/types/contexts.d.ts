import { ReactNode } from 'react';

/* Product Context */
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
}

export interface ProductsContextState {
    areProductsLoading: boolean;
    isProductsError: boolean;
    products: Product[];
    isSingleProductLoading: boolean;
    isSingleProductSuccess: boolean;
    isSingleProductError: boolean;
    singleProduct: Product | null;
}

export interface ProductsProviderProps {
    children: ReactNode;
}

export interface ProductsContextDispatcherAction {
    type: string;
    payload?: Product | Product[];
}

interface ProductsContextUtils {
    fetchProducts: (url: string) => Promise<void>;
    fetchSingleProduct: (url: string, id: number) => Promise<void>;
}

export type ProductsContextInterface = ProductsContextState & ProductsContextUtils;

/* Filter Context */
type ProductsListView = 'grid' | 'list';
type Sort = 'price-highest' | 'price-lowest' | 'name-ascending' | 'name-descending';
export interface Filters {
    text: string;
    brand: 'all' | string;
    category: 'all' | string;
    currMinPrice: number;
    currMaxPrice: number;
    currMinStock: number;
    currMaxStock: number;
    productsListView: ProductsListView;
    sort: Sort;
}

export interface QueryFilters {
    text?: string;
    brand?: 'all' | string;
    category?: 'all' | string;
    currMinPrice?: string;
    currMaxPrice?: string;
    currMinStock?: string;
    currMaxStock?: string;
    productsListView?: ProductsListView;
    sort?: Sort;
}

export interface FilterContextState {
    filteredProducts: Product[];
    allProducts: Product[];
    filters: Filters;
    brands: string[];
    categories: string[];
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    queryFilters: QueryFilters;
}

export interface FilterUtils {
    setView: React.ChangeEventHandler<HTMLSelectElement>;
    updateSort: React.ChangeEventHandler<HTMLSelectElement>;
    updateFilters: (name: string, value: number | string) => void;
    updateQueryFilters: (name: string, value: number | string) => void;
    updateFiltersFromQuery: (newFilter: { [key: string]: string }) => void;
    clearFilters: () => void;
}

export type FilterContextInterface = FilterContextState & FilterUtils;

export interface FilterProviderProps {
    children: React.ReactNode;
}

export type FilterContextDispatcherAction = {
    type: string;
    payload?:
        | string
        | product[]
        | ProductsListView
        | { name: string; value: string | number }
        | Filters
        | QueryFilters
        | { [key: string]: string }
        | Partial<Filters>
        | FilterContextState
        | { name: string; value: number };
};

/* Cart context */

export interface CartItem {
    id: number;
    title: string;
    amount: number;
    image: string;
    price: number;
    stock: number;
}

export type Cart = CartItem[];

export type PromoCode = {
    name: string;
    discountValue: number;
    id: number;
    active: boolean;
};
export interface CartContextState {
    cart: Cart;
    totalProducts: number;
    totalAmount: number;
    promocodes: PromoCode[];
}

export interface CartContextUtils {
    addToCart: (id: number, amount: number, product: Product) => void;
    removeFromCart: (id: number) => void;
    updateCartItemAmount: (id: number, value: number) => void;
    togglePromocode: (id: number, isActive: boolean) => void;
    getCartFinalAmount: () => { finalAmount: number; discountValue: number };
    clearCart: () => void;
}

export interface CartProviderProps {
    children: ReactNode;
}

export interface CartContextDispatcherAction {
    type: string;
    payload?:
        | number
        | { id: number; amount: number; product: Product }
        | { id: number; value: number }
        | { id: number; isActive: boolean };
}

export type CartContextInterface = CartContextState & CartContextUtils;
