/* Product Card */

import { ProductListView } from './contexts';

export interface ProductCardProps {
    layout: ProductListView;
    description: string;
    thumbnail: string;
    id: number;
    category: string;
    price: number;
}
