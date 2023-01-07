import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,
} from '../utils/actions';

const productsReducer = (state, action) => {
    switch (action.type) {
        /* Get Products */
        case GET_PRODUCTS_BEGIN:
            return { ...state, areProductsLoading: true, isProductsError: false };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, areProductsLoading: false, products: action.payload };
        case GET_PRODUCTS_ERROR:
            return { ...state, areProductsLoading: false, isProductsError: true };
        /* Get single product */
        case GET_SINGLE_PRODUCT_BEGIN:
            return {
                ...state,
                isSingleProductLoading: true,
                isSingleProductSuccess: false,
                isSingleProductError: false,
            };
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isSingleProductLoading: false,
                isSingleProductSuccess: true,
                singleProduct: action.payload,
            };
        case GET_SINGLE_PRODUCT_ERROR:
            return { ...state, isSingleProductLoading: false, isSingleProductError: true };
        default:
            break;
    }

    throw new Error(`No Mathcing "${action.type}" - action type `);
};

export default productsReducer;
