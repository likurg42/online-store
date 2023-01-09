import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductsProvider } from './context/productsContext';
import { FilterProvider } from './context/filterContext';
import App from './App';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <React.StrictMode>
        <ProductsProvider>
            <FilterProvider>
                <App />
            </FilterProvider>
        </ProductsProvider>
    </React.StrictMode>,
);
