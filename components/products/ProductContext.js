import React, { createContext, useState, useEffect } from "react";
import {
  getProducts,
  updateProduct,
  getCategories,
  uploadImg,
  insertProduct,
  deleteProduct,
} from "./ProductService";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    onGetProducts(categories[4]?.id, props.db);
    onGetCategories();
  }, []);
  const onUploadImg = async (img) => {
    try {
      return await uploadImg(img);
    } catch (error) {
      console.log(error);
    }
  };
  const onGetProducts = async (categoryKey, db = props.db) => {
    try {
      let result = await getProducts(categoryKey, db);
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCategories = async (db = props.db) => {
    try {
      let result = await getCategories(db);
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteProduct = async (id, categoryKey, db = props.db) => {
    try {
      await deleteProduct(id, db);
      await onGetProducts(categoryKey, db);
    } catch (error) {
      console.log(error);
    }
  };
  const onInsertProduct = async (product, db = props.db) => {
    try {
      await insertProduct(product, db);
      await onGetProducts(categories[4]?.id, db);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateProducts = async (product, db = props.db) => {
    try {
      await updateProduct(product, db);
      await onGetProducts(categories[4]?.id, db);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        onUpdateProducts,
        onGetProducts,
        onUploadImg,
        onInsertProduct,
        onDeleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
