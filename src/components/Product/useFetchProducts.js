import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCategories,
  addProducts,
  getError,
} from "../../store/slices/product";

export default function useFetchProducts(url, options) {
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch(url);
        const data = await response.json();
        const products = data.products;
        dispatch(addProducts(products));
      };
      const fetchCategories = async () => {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const categories = await response.json();
        dispatch(addCategories(categories));
      };
      fetchProducts();
      fetchCategories();
    }, [url, dispatch, options]);
  } catch (error) {
    dispatch(getError(error));
  }
}
