import React, { useEffect, useState } from "react";
// css
import "./product-details.css";
import { calculateDiscountedPrice } from "../../utils/calculateDiscountPrice";
// icon
import { StarIcon } from "../../constants/icons.js";
// loader
import { Loader } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/product.js";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [pd, setPd] = useState({});
  const { q } = useParams();
  const [thumbnail, setThumbnail] = useState(pd ? pd.thumbnail : null);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${q}`
        );
        const data = await response.json();
        setPd(data.products[0]);
        setThumbnail(data.products[0].thumbnail);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [q]);

  function handleAddToCart() {
    const cartToBeAdded = { ...pd, quantity: 1 };
    dispatch(addToCart([...cart, cartToBeAdded]));
  }

  if (loading) return <Loader />;
  return (
    <section className="product-details small-container">
      <div className="product-details-header mt-8" style={{ color: "grey" }}>
        <span className="fw-500 fs-small-2 capital">Products/</span>
        <span className="fw-500 fs-small-2 capital">{pd.category}/</span>
        <span className="fw-500 fs-small-2 capital">{pd.brand}/</span>
        <span className="fw-500 fs-small-2 capital">{pd.title}</span>
      </div>
      <div className="product-details-content mt-1 flex wrap">
        <div className="product-details-images flex gap-1">
          <div className="product-details-image-showcase flex-col gap-1">
            {pd.images &&
              pd.images.length > 0 &&
              pd.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="br-5"
                  onClick={() => setThumbnail(image)}
                />
              ))}
          </div>
          <div className="product-details-image-thumbnail">
            <img src={thumbnail} alt="thumbnail" className="br-5" />
          </div>
        </div>
        <div className="product-details-original">
          <p className="product-details-title fw-600">{pd.title}</p>
          <p className="fs-small inline-block mt-4 br-5 product-card-price price-bg p-8 ai-center">
            <span
              className="discounted-price line-through"
              style={{ color: "grey" }}
            >
              ₹{pd.price}
            </span>
            <span className="fw-700 green-text-clr mi-8">
              ₹{calculateDiscountedPrice(pd.price, pd.discountPercentage)}
            </span>
            <span className="fw-500" style={{ color: "var(--clr-dark)" }}>
              {Math.round(pd.discountPercentage).toFixed(0)}%
            </span>
          </p>
          <p className="product-details-fs mt-4">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                style={{
                  color: `${
                    index < Math.round(pd.rating).toFixed(0)
                      ? "var(--clr-accent)"
                      : ""
                  }`,
                }}
              />
            ))}
          </p>
          {pd.stock === 0 ? (
            <p className=" br-5 fs-subheading fw-600 text-crimson text-center">
              Out of stock
            </p>
          ) : (
            <p className="fs-small alert-bg text-center br-5">
              Hurry up only{" "}
              <strong className="italic" style={{ color: "crimson" }}>
                {pd.stock}
              </strong>{" "}
              items are available!
            </p>
          )}
          <p className="fs-small mt-4">{pd.description}</p>
          <div className="product-details-buttons flex flex-between gap-4 mt-1">
            {cart.find((c) => c.title === pd.title) ? (
              <button
                className="add-to-cart-btn"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
