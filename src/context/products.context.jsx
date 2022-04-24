import { createContext, useState, useEffect } from 'react';

// import SHOP_DATA from '../shop-data';
import {getCategoriesAndDocuments } from '../utils/firebase/firebase.utils' 
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories');
      console.log(categoryMap);
    };

    getCategoriesMap();
  }, []);

 

  // useEffect(() =>{
  //   addCollectionAndDocuments('catagories',SHOP_DATA)
  // },[])
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

