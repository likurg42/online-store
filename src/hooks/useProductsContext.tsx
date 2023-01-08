import { useContext } from 'react';
import { ProductsContext } from '../context/productsContext';

const useProductsContext = () => useContext(ProductsContext);

export default useProductsContext;
