import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterContextInterface } from '../../types/contexts';
import useFilterContext from '../../hooks/useFilterContext';
import { Filter, ProductForm, ProductsList } from '../../components';
import styles from './ProductsPage.module.scss';

export default function ProductsPage() {
    const { updateFiltersFromQuery } = useFilterContext() as FilterContextInterface;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const parsedUrl: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
            parsedUrl[key] = value;
        });
        updateFiltersFromQuery(parsedUrl);
    }, [searchParams, updateFiltersFromQuery]);

    return (
        <main className="container">
            <section className={styles.products}>
                <ProductForm />
                <div className={styles.products__items}>
                    <Filter />
                    <ProductsList />
                </div>
            </section>
        </main>
    );
}
