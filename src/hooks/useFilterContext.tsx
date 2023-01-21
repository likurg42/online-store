import { useContext } from 'react';
import { FilterContext } from '../context/filterContext';

export default function useFilterContext() {
    return useContext(FilterContext);
}
