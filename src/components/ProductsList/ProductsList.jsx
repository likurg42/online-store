import React from 'react';
import useProductsContext from '../../hooks/useProductsContext';
import cn from './ProductsList.module.scss';
import ProductCard from '../ProductCard';

function ProductsList() {
    const { products } = useProductsContext();

    return (
        <div className={cn.products}>
            <ul className={cn.products__grid}>
                {products.map((product) => {
                    const { id, title, description, thumbnail, price, category } = product;
                    return (
                        <li key={id}>
                            <ProductCard
                                title={title}
                                description={description}
                                thumbnail={thumbnail}
                                price={price}
                                category={category}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProductsList;
