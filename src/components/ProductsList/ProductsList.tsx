import React from 'react';
import styles from './ProductsList.module.scss';
import ProductCard from '../ProductCard';
import { FilterContextInterface } from '../../types/contexts';
import useFilterContext from '../../hooks/useFilterContext';

function ProductsList() {
    const { filters, filteredProducts } = useFilterContext() as FilterContextInterface;
    const { productsListView } = filters;
    const layoutType =
        productsListView === 'grid' ? styles['products__layout--grid'] : styles['products__layout--list'];
    return (
        <div className={styles.products}>
            <ul className={`${styles.products__layout} ${layoutType}`}>
                {filteredProducts.map((product) => {
                    const { id, description, thumbnail, price, category, stock, title, rating, brand, images } =
                        product;
                    return (
                        <li key={id}>
                            <ProductCard
                                title={title}
                                stock={stock}
                                layout={productsListView}
                                description={description}
                                thumbnail={thumbnail}
                                price={price}
                                category={category}
                                id={id}
                                rating={rating}
                                brand={brand}
                                images={images}
                            />
                        </li>
                    );
                })}
                {filteredProducts.length === 0 ? 'Sorry, no such items' : ''}
            </ul>
        </div>
    );
}

export default ProductsList;
