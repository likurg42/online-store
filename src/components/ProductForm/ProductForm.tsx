import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductForm.module.scss';
import useFilterContext from '../../hooks/useFilterContext';
import { FilterContextInterface } from '../../types/contexts';

export default function ProductForm() {
    const [urlButtonText, setUrlButtonText] = useState('Copy link');
    const {
        updateFilters,
        filters,
        minStock,
        maxStock,
        minPrice,
        maxPrice,
        queryFilters,
        brands,
        categories,
        clearFilters,
        updateQueryFilters,
    } = useFilterContext() as FilterContextInterface;
    const { text, currMinPrice, currMaxPrice, currMaxStock, currMinStock, brand, category } = filters;

    const [, setSearchParams] = useSearchParams();

    const updateQuery = useCallback(() => {
        const newSearchParams = new URLSearchParams();

        Object.entries(queryFilters).forEach(([name, value]) => {
            newSearchParams.append(name, String(value));
        });

        setSearchParams(newSearchParams);
    }, [queryFilters, setSearchParams]);

    useEffect(() => {
        if (Object.keys(queryFilters).length > 0) {
            updateQuery();
        } else {
            setSearchParams(new URLSearchParams(''));
        }
    }, [queryFilters, updateQuery, setSearchParams]);

    return (
        <form className={styles.productForm}>
            <label className={styles.productForm__item} htmlFor="text">
                <span className={styles.productForm__label}>Name</span>
                <input
                    type="text"
                    id="text"
                    name="text"
                    className={styles.productForm__search}
                    placeholder="Search..."
                    onChange={(e) => {
                        updateFilters(e);
                        const { name, value } = e.target as HTMLInputElement;
                        updateQueryFilters(name, value);
                    }}
                    value={text}
                />
            </label>
            <label className={styles.productForm__item} htmlFor="company">
                <span className={styles.productForm__label}>Brand</span>
                <select
                    name="brand"
                    id="brand"
                    className={styles.productForm__select}
                    value={brand}
                    onChange={(e) => {
                        updateFilters(e);
                        const { name, value } = e.target as HTMLSelectElement;
                        updateQueryFilters(name, value);
                    }}
                >
                    {brands.map((brandItem) => (
                        <option key={brandItem} value={brandItem}>
                            {brandItem}
                        </option>
                    ))}
                </select>
            </label>
            <label className={styles.productForm__item} htmlFor="category">
                <span className={styles.productForm__label}>Category</span>
                <select
                    name="category"
                    id="category"
                    className={styles.productForm__select}
                    value={category}
                    onChange={(e) => {
                        updateFilters(e);
                        const { name, value } = e.target as HTMLSelectElement;
                        updateQueryFilters(name, value);
                    }}
                >
                    {categories.map((categoryItem) => (
                        <option key={categoryItem} value={categoryItem}>
                            {categoryItem}
                        </option>
                    ))}
                </select>
            </label>
            <p className={styles.productForm__item}>
                <span className={styles.productForm__label}>Price</span>

                <span className={styles.productForm__labelGroup}>
                    <label className={styles.productForm__label} htmlFor="currMinPrice">
                        {currMinPrice}
                    </label>
                    <label className={styles.productForm__label} htmlFor="currMaxPrice">
                        {currMaxPrice || maxPrice}
                    </label>
                </span>
                <span className={styles.productForm__multiRange}>
                    <input
                        id="currMinPrice"
                        type="range"
                        name="currMinPrice"
                        className={styles.productForm__range}
                        onChange={updateFilters}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                        }}
                        min={minPrice}
                        max={maxPrice}
                        value={currMinPrice}
                        step="10"
                    />
                    <input
                        id="currMaxPrice"
                        type="range"
                        name="currMaxPrice"
                        className={styles.productForm__range}
                        onChange={updateFilters}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                        }}
                        min={minPrice}
                        max={maxPrice}
                        value={currMaxPrice || maxPrice}
                        step="10"
                    />
                </span>
            </p>
            <p className={styles.productForm__item}>
                <span className={styles.productForm__label}>Stock</span>

                <span className={styles.productForm__labelGroup}>
                    <label className={styles.productForm__label} htmlFor="currMinStock">
                        {currMinStock}
                    </label>
                    <label className={styles.productForm__label} htmlFor="currMaxStock">
                        {currMaxStock || maxStock}
                    </label>
                </span>
                <span className={styles.productForm__multiRange}>
                    <input
                        id="currMinStock"
                        type="range"
                        name="currMinStock"
                        className={styles.productForm__range}
                        onChange={updateFilters}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                        }}
                        min={minStock}
                        max={maxStock}
                        value={currMinStock}
                        step="1"
                    />
                    <input
                        id="currMaxStock"
                        type="range"
                        name="currMaxStock"
                        className={styles.productForm__range}
                        onChange={updateFilters}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                        }}
                        min={minStock}
                        max={maxStock}
                        value={currMaxStock || maxStock}
                        step="1"
                    />
                </span>
                <button
                    className={styles.productForm__btn}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        clearFilters();
                        setSearchParams(new URLSearchParams());
                    }}
                >
                    Clear
                </button>
                <button
                    className={styles.productForm__btn}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(window.location.href);
                        setUrlButtonText('url copied!');
                        setTimeout(() => setUrlButtonText('Copy url'), 700);
                    }}
                >
                    {urlButtonText}
                </button>
            </p>
        </form>
    );
}
