import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductsProvider } from './context/productsContext';
import App from './App';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <React.StrictMode>
        <ProductsProvider>
            <App />
        </ProductsProvider>
    </React.StrictMode>,
);
