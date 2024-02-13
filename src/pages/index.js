import { lazy } from "react";

// Home
const Home = lazy(() => import("./Home/Home.jsx"));
// Product Details
const ProductDetails = lazy(() =>
  import("./ProductDetails/ProductDetails.jsx")
);
// Cart
const Cart = lazy(() => import("./Cart/Cart.jsx"));
// Not Found
const NotFound = lazy(() => import("./NotFound/NotFound.jsx"));

// export
export { Home, ProductDetails, Cart, NotFound };
