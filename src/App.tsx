import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { ErrorPage, ProductsPage } from './pages/index';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                {/* <Route path="/card" element={<CartPage />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}
