import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { CartPage, ErrorPage, ProductsPage, SingleProductPage } from './pages/index';

export default function App() {
    return (
        <BrowserRouter basename="/online-store">
            <Header />
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}
