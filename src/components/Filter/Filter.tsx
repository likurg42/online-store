import React from 'react';
import useFilterContext from '../../hooks/useFilterContext';
import { FilterContextInterface } from '../../types/contexts';
import styles from './Filter.module.scss';

export default function Filter() {
    const { filters, filteredProducts, setView, updateSort } = useFilterContext() as FilterContextInterface;
    const { productsListView, sort } = filters;

    return (
        <form className={styles.filter}>
            <p className={styles.filter__found}> {filteredProducts.length} Found items</p>
            <select className={styles.filter__select} name="sort" value={productsListView} onChange={setView}>
                <option value="grid">Grid</option>
                <option value="list">List</option>
            </select>
            <select className={styles.filter__select} name="sort" value={sort} onChange={updateSort}>
                <option value="price-lowest">Price: Low to High</option>
                <option value="price-highest">Price: High to Low</option>
                <option value="name-ascending">Name: Ascending</option>
                <option value="name-descending">Name: Descending</option>
            </select>
        </form>
    );
}
