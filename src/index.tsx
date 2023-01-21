import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductsProvider } from './context/productsContext';
import { FilterProvider } from './context/filterContext';
import { CartProvider } from './context/cartContext';
import App from './App';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <React.StrictMode>
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </ProductsProvider>
    </React.StrictMode>,
);
