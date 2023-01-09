import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams, useHistory,
// import { Error, Breadcrumbs, ProductImages } from '../components';
import ErrorPage from '../ErrorPage';
import useProductsContext from '../../hooks/useProductsContext';
import { ProductsContextInterface } from '../../types/contexts';
import { PRODUCTS_URL } from '../../utils/constants';
// import { Loading, Error, ProductImages, AddToCartButton } from '../components/index';

function SingleProductPage() {
    const navigate = useNavigate();
    const { id: paramsId } = useParams();

    const id = paramsId ? parseInt(paramsId, 10) : 1;

    const { isSingleProductLoading, isSingleProductSuccess, isSingleProductError, singleProduct, fetchSingleProduct } =
        useProductsContext() as ProductsContextInterface;

    useEffect(() => {
        if (!singleProduct ?? singleProduct?.id !== id) {
            fetchSingleProduct(PRODUCTS_URL, id);

            console.log(id);
        }

        if (singleProduct?.id !== id) {
            console.log(id, 'new');

            fetchSingleProduct(PRODUCTS_URL, id);
        }
    }, [id, fetchSingleProduct, singleProduct]);

    useEffect(() => {
        if (!paramsId || isSingleProductError) {
            setTimeout(() => {
                navigate('/products');
            }, 3000);
        }
    });

    if (isSingleProductError) {
        return <ErrorPage />;
    }

    if (singleProduct && singleProduct.id === id && isSingleProductSuccess) {
        const { title } = singleProduct;
        return (
            <>
                {/* <Breadcrumbs title={title} product /> */}
                <div className="container page">
                    <div className="products-center">{/* <ProductImages /> */}</div>
                    <section className="content">
                        <h2>{title}</h2>
                    </section>
                </div>
            </>
        );
    }

    return (
        <div className="container">
            {/* <Breadcrumbs title="***" product /> */}
            {isSingleProductLoading || <div>Loading</div>}
        </div>
    );
}

export default SingleProductPage;
