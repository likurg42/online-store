import React from 'react';
import useProductsContext from '../../hooks/useProductsContext';
import cn from './ProductsList.module.scss';
import ProductCard from '../ProductCard';
import { ProductsContextInterface } from '../../types/contexts';

function ProductsList() {
    const { products } = useProductsContext() as ProductsContextInterface;

    return (
        <div className={cn.products}>
            <ul className={cn.products__grid}>
                {products.map((product) => {
                    const { id, description, thumbnail, price, category } = product;
                    return (
                        <li key={id}>
                            <ProductCard
                                description={description}
                                thumbnail={thumbnail}
                                price={price}
                                category={category}
                                id={id}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProductsList;
