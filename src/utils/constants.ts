export interface ILinks {
    id: number;
    text: string;
    url: string;
}

export const links: ILinks[] = [
    {
        id: 1,
        text: 'Products',
        url: '/',
    },
    {
        id: 2,
        text: 'about',
        url: '/cart',
    },
];

export const PRODUCTS_URL = 'https://dummyjson.com/products/';
