import { lazy } from "react";

// const Header
const Header = lazy(() => import("./Header/Header.jsx"));
// const Banner
const Banner = lazy(() => import("./Banner/Banner.jsx"));
// Product
const ProductList = lazy(() => import("./Product/ProductList.jsx"));
// export
export { Header, Banner };
