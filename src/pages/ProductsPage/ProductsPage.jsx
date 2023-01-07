import React from 'react';
import { ProductsList } from '../../components';
import cl from './ProductsPage.module.scss';

export default function ProductsPage() {
    return (
        <main className="container">
            <section className={cl.products}>
                <div>Filter</div>
                <ProductsList />
            </section>
        </main>
    );
}
