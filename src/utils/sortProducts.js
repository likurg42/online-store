import { productSortTypes } from './constants';

const sortProducts = (a, b, sort) => {
    switch (sort) {
        case productSortTypes.priceLowest:
            return a.price - b.price;
        case productSortTypes.priceHighest:
            return b.price - a.price;
        case productSortTypes.nameAscending:
            return a.name < b.name ? -1 : 1;
        case productSortTypes.nameDescending:
            return b.name < a.name ? -1 : 1;
        default:
            break;
    }

    throw new Error(`There is no ${sort} type`);
};

export default sortProducts;
