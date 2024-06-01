import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    //set initial products data from hard coded shop data as default
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
           const categoryMap = await getCategoriesAndDocuments();
           console.log(categoryMap);
           setCategoriesMap(categoryMap);
        };
        
        getCategoriesMap();
    }, []);

    // // insert data/documents to firestore database under 'categories'
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}