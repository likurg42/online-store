import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams, useHistory,
import ErrorPage from '../ErrorPage';
import style from './SingleProductPage.module.scss';
import useProductsContext from '../../hooks/useProductsContext';
import { ProductsContextInterface } from '../../types/contexts';
import { PRODUCTS_URL } from '../../utils/constants';
import { SingleProduct, Breadcrumbs } from '../../components';

function SingleProductPage() {
    const navigate = useNavigate();
    const { id: paramsId } = useParams();

    const id = paramsId ? parseInt(paramsId, 10) : 1;

    const { isSingleProductLoading, isSingleProductSuccess, isSingleProductError, singleProduct, fetchSingleProduct } =
        useProductsContext() as ProductsContextInterface;

    useEffect(() => {
        if (!singleProduct ?? singleProduct?.id !== id) {
            fetchSingleProduct(PRODUCTS_URL, id);
        }

        if (singleProduct?.id !== id) {
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
        const {
            title,
            brand,
            category,
            description,
            id: currProductId,
            images,
            price,
            thumbnail,
            rating,
            stock,
        } = singleProduct;
        return (
            <div className="container">
                <div className={style.productPage}>
                    <Breadcrumbs title={title} />
                    <div className="products-center">{/* <ProductImages /> */}</div>
                    <section className="content">
                        <SingleProduct
                            title={title}
                            brand={brand}
                            category={category}
                            description={description}
                            id={currProductId}
                            images={images}
                            price={price}
                            thumbnail={thumbnail}
                            rating={rating}
                            stock={stock}
                        />
                    </section>
                </div>
            </div>
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
