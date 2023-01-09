type Action = string;
/* Products */
export const GET_PRODUCTS_BEGIN: Action = 'GET_PRODUCTS_BEGIN';
export const GET_PRODUCTS_SUCCESS: Action = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR: Action = 'GET_PRODUCTS_ERROR';
export const GET_SINGLE_PRODUCT_BEGIN: Action = 'GET_SINGLE_PRODUCT_BEGIN';
export const GET_SINGLE_PRODUCT_SUCCESS: Action = 'GET_SINGLE_PRODUCT_SUCCESS';
export const GET_SINGLE_PRODUCT_ERROR: Action = 'GET_SINGLE_PRODUCT_ERROR';
/* Filter */
export const LOAD_PRODUCTS: Action = 'LOAD_PRODUCTS';
export const SET_VIEW: Action = 'SET_VIEW';
export const UPDATE_SORT: Action = 'UPDATE_SORT';
export const SORT_PRODUCTS: Action = 'SORT_PRODUCTS';
export const UPDATE_FILTERS: Action = 'UPDATE_FILTERS';
export const UPDATE_FILTERS_FROM_QUERY: Action = 'UPDATE_FILTERS_FROM_QUERY';
export const FILTER_PRODUCTS: Action = 'FILTER_PRODUCTS';
export const CLEAR_FILTERS: Action = 'CLEAR_FILTERS';
/* Cart */
export const ADD_TO_CART: Action = 'ADD_TO_CART';
export const REMOVE_CART_ITEM: Action = 'REMOVE_CART_ITEM';
export const TOGGLE_CART_ITEM: Action = 'REMOVE_CART_ITEM';
export const TOGGLE_CART_ITEM_AMOUNT: Action = 'TOGGLE_CART_ITEM_AMOUNT';
export const CLEART_CART: Action = 'CLEAR_CART';
export const COUNT_CART_TOTALS: Action = 'COUNT_CART_TOTALS';
export const UPDATE_CART_ITEM_AMOUNT: Action = 'UPDATE_CART_ITEM_AMOUNT';
