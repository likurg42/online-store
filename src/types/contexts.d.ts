import { ReactNode } from 'react';

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
    image: string[];
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

export type ProductsContextInterface = ProductsContextState & {
    fetchSingleProduct: (url: string, id: keyof Product) => Promise<void>;
};
