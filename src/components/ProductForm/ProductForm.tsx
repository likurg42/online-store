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
        filteredProducts,
        updateQueryFilters,
    } = useFilterContext() as FilterContextInterface;
    const { text, brand, category } = filters;
    let { currMaxPrice, currMinPrice, currMaxStock, currMinStock } = filters;
    const [, setSearchParams] = useSearchParams();
    const filteredBrands = filteredProducts.map((p) => p.brand);
    const filteredCategories = filteredProducts.map((p) => p.category);
    currMaxPrice = filteredProducts.reduce((acc, product) => {
        if (acc < product.price) return product.price;
        return acc;
    }, 0);
    currMinPrice = filteredProducts.reduce((acc, product) => {
        if (acc > product.price) return product.price;
        return acc;
    }, currMaxPrice);
    currMaxStock = filteredProducts.reduce((acc, product) => {
        if (acc < product.stock) return product.stock;
        return acc;
    }, 0);
    currMinStock = filteredProducts.reduce((acc, product) => {
        if (acc > product.stock) return product.stock;
        return acc;
    }, currMaxPrice);

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
                        const { name, value } = e.target as HTMLInputElement;
                        updateQueryFilters(name, value);
                        updateFilters(name, value);
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
                        const { name, value } = e.target as HTMLSelectElement;
                        updateFilters(name, value);
                        updateQueryFilters(name, value);
                    }}
                >
                    {brands.map((brandItem) => {
                        const disabled = !filteredBrands.includes(brandItem);
                        return (
                            <option
                                key={brandItem}
                                value={brandItem}
                                style={{ color: `${disabled ? 'rgb(235, 235, 228)' : 'black'}` }}
                            >
                                {brandItem}
                            </option>
                        );
                    })}
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
                        const { name, value } = e.target as HTMLSelectElement;
                        updateFilters(name, value);
                        updateQueryFilters(name, value);
                    }}
                >
                    {categories.map((categoryItem) => {
                        const disabled = !filteredCategories.includes(categoryItem);
                        return (
                            <option
                                key={categoryItem}
                                value={categoryItem}
                                style={{ color: disabled ? 'rgb(235, 235, 228)' : 'black' }}
                            >
                                {categoryItem}
                            </option>
                        );
                    })}
                </select>
            </label>
            <p className={styles.productForm__item}>
                <span className={styles.productForm__label}>Price</span>

                <span className={styles.productForm__labelGroup}>
                    <label className={styles.productForm__label} htmlFor="currMinPrice">
                        {currMinPrice || minPrice}
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
                        onChange={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateFilters(name, parseInt(value, 10));
                        }}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                        }}
                        min={minPrice}
                        max={maxPrice}
                        value={minPrice || currMinPrice}
                        step="10"
                    />
                    <input
                        id="currMaxPrice"
                        type="range"
                        name="currMaxPrice"
                        className={styles.productForm__range}
                        onChange={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateFilters(name, parseInt(value, 10));
                        }}
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
                        onChange={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateFilters(name, parseInt(value, 10));
                        }}
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
                        onChange={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateFilters(name, parseInt(value, 10));
                        }}
                        onMouseUp={(e) => {
                            const { name, value } = e.target as HTMLInputElement;
                            updateQueryFilters(name, parseInt(value, 10));
                            // updateFilters(name, parseInt(value, 10));
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
