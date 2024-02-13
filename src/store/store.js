import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product.js";

const store = configureStore({
  reducer: { productReducer },
});

export default store;
