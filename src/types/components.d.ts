/* Product Card */

import { ProductListView } from './contexts';

export interface ProductCardProps {
    title: string;
    stock: number;
    layout: ProductListView;
    description: string;
    thumbnail: string;
    id: number;
    category: string;
    price: number;
    rating: number;
    brand: string;
    images: string[];
}
