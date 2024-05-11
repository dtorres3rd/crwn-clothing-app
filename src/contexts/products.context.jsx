import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) =>{
    //set initial products data from hard coded shop data as default
    const  [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}