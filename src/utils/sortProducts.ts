import { Product, Sort } from '../types/contexts';

const sortProducts = (a: Product, b: Product, sort: Sort) => {
    switch (sort) {
        case 'price-lowest':
            return a.price - b.price;
        case 'price-highest':
            return b.price - a.price;
        case 'name-ascending':
            return a.title < b.title ? -1 : 1;
        case 'name-descending':
            return b.title < a.title ? -1 : 1;
        default:
            break;
    }

    throw new Error(`There is no ${sort} type`);
};

export default sortProducts;
