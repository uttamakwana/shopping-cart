import React from "react";
import { useDispatch } from "react-redux";
import { addProductDetails } from "../../store/slices/product.js";
import { useNavigate } from "react-router-dom";
import { calculateDiscountedPrice } from "../../utils/calculateDiscountPrice.js";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setProductDetails() {
    dispatch(addProductDetails(product));
    navigate(`/product/${product.title}`);
  }
  return (
    <div className="product-card" onClick={setProductDetails}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="pointer"
        title={`Rating: ${product.rating}`}
      />
      <div className="product-card-content p-8">
        <h1 className="fs-text">{product.title}</h1>
        <p className="fs-small fw-500">{product.brand}</p>
        <p className="fs-small flex gap-8 mt-4 product-card-price">
          <span className="discounted-price" style={{ color: "grey" }}>
            ₹
            {calculateDiscountedPrice(
              product.price,
              product.discountPercentage
            )}
          </span>
          <span className="fw-700" style={{ color: "green" }}>
            ₹{product.price}
          </span>
          <span className="fw-500" style={{ color: "var(--clr-dark)" }}>
            {Math.round(product.discountPercentage).toFixed(0)}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;
