import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productDetails: null,
  categories: [],
  category: null,
  loading: true,
  error: null,
  cart: JSON.parse(localStorage.getItem("my-amazon-cart")) || [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    addCategories(state, action) {
      state.categories = action.payload;
      state.loading = false;
    },
    addCategory(state, action) {
      state.category = action.payload;
      state.loading = false;
    },
    addLoading(state, action) {
      state.loading = action.payload;
    },
    fullfilled(state, action) {
      state.loading = !action.payload;
    },
    addProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    addToCart(state, action) {
      state.cart = action.payload;
      localStorage.setItem("my-amazon-cart", JSON.stringify(action.payload));
    },
  },
});

export const {
  addProducts,
  addCategories,
  getError,
  addCategory,
  addLoading,
  fullfilled,
  addProductDetails,
  addToCart,
} = productSlice.actions;
export default productSlice.reducer;
