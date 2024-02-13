import React, { useEffect, useRef, useState } from "react";
// components
import { Banner } from "../../components";
import ProductList from "../../components/Product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getError, addLoading } from "../../store/slices/product";
import useFetchProducts from "../../components/Product/useFetchProducts";
import { Loader } from "../../constants";

const Home = () => {
  const homeRef = useRef(null);
  const { category, loading } = useSelector((state) => state.productReducer);
  const [skip, setSkip] = useState(30);
  const dispatch = useDispatch();
  useFetchProducts("https://dummyjson.com/products");

  useEffect(() => {
    const handleScroll = async () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Check if user has scrolled to the bottom of the page
      if (scrollTop + clientHeight >= scrollHeight) {
        // Perform your action here
        try {
          if (category && category !== "All") {
            console.log("fetching category products!");
            const response = await fetch(
              `https://dummyjson.com/products/category/${category}?limit=${skip}`
            );
            const data = await response.json();
            dispatch(addProducts(data.products));
          } else {
            const response = await fetch(
              `https://dummyjson.com/products?limit=${skip}`
            );
            const data = await response.json();
            dispatch(addProducts(data.products));
          }
          setSkip((prev) => prev + 30);
        } catch (error) {
          dispatch(getError(error));
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [skip, dispatch, category]);

  return (
    <main className="home-page" ref={homeRef}>
      <Banner />
      <ProductList />
      {loading && (
        <p className="mb-2 absolute-center overlay fs-small fw-500 readable-container text-center">
          Loading products...
        </p>
      )}
    </main>
  );
};

export default Home;
