import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { noItemsInCart } from "../../constants/images.js";
import { useNavigate } from "react-router-dom";
import { calculateDiscountedPrice } from "../../utils/calculateDiscountPrice.js";
import { StarIcon } from "../../constants/icons.js";
import { addToCart } from "../../store/slices/product.js";

const Cart = () => {
  const { cart } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    // Calculate total discount
    let total = 0;
    cart.forEach((item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.price,
        item.discountPercentage
      );
      total += (item.price - discountedPrice) * item.quantity;
    });
    setTotalDiscount(total);
  }, [cart]);

  const removeFromCart = (item) => {
    const sureToDelete = confirm(`Want to delete the item: ${item.title}`);
    if (sureToDelete) {
      const filteredCart = cart.filter(
        (cartItem) => item.title !== cartItem.title
      );
      localStorage.setItem("my-amazon-cart", JSON.stringify(filteredCart));
      dispatch(addToCart(filteredCart));
    }
  };

  const updateQuantity = (item, newQuantity) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.title === item.title) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    dispatch(addToCart(updatedCart));
  };

  return cart && cart.length > 0 ? (
    <section className="cart-details mb-1 small-container flex gap-1 wrap jc-center">
      <div className="cart-items flex-col gap-1">
        {cart.map((item) => (
          <div className="cart-item max-w-680 br-5" key={item.id}>
            <div className="cart-body flex wrap">
              <img
                className="cart-item-image max-w-350 w-100 br-5"
                src={item.thumbnail}
                alt={item.title}
              />
              <div className="cart-body-content p-8">
                <p className="product-details-title fw-600">{item.title}</p>
                <p className="fs-small inline-block mt-4 br-5 product-card-price price-bg p-8 ai-center">
                  <span
                    className="discounted-price line-through"
                    style={{ color: "grey" }}
                  >
                    ₹{item.price}
                  </span>
                  <span className="fw-700 green-text-clr mi-8">
                    ₹
                    {calculateDiscountedPrice(
                      item.price,
                      item.discountPercentage
                    )}
                  </span>
                  <span className="fw-500" style={{ color: "var(--clr-dark)" }}>
                    {Math.round(item.discountPercentage).toFixed(0)}%
                  </span>
                </p>
                <p className="product-details-fs mt-4">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      style={{
                        color: `${
                          index < Math.round(item.rating).toFixed(0)
                            ? "var(--clr-accent)"
                            : ""
                        }`,
                      }}
                    />
                  ))}
                </p>
                {item.stock === 0 ? (
                  <p className=" br-5 fs-subheading fw-600 text-crimson text-center">
                    Out of stock
                  </p>
                ) : (
                  <p className="fs-small alert-bg text-center br-5">
                    Hurry up only{" "}
                    <strong className="italic" style={{ color: "crimson" }}>
                      {item.stock}
                    </strong>{" "}
                    items are available!
                  </p>
                )}
                <p className="fs-small mt-4">{item.description}</p>
              </div>
            </div>
            <div className="cart-footer flex flex gap-1">
              <div className="quantity-btn flex gap-4 ai-center">
                <button
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className="minus-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  disabled={item.quantity === item.stock}
                  className="plus-btn"
                >
                  +
                </button>
              </div>
              <button
                className="delete-btn text-crimson fw-600"
                onClick={() => removeFromCart(item)}
              >
                Delete
              </button>
              <button
                className="extra-btn"
                onClick={() => navigate(`/product/${item.title}`)}
              >
                See More Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-price-details">
        <p className="cart-price-details-header fs-text fw-500 p-8">
          Price Details
        </p>
        <p className="cart-price-main-price flex-between fs-small gap-1 p-8">
          <span>Total Price</span>
          <strong>
            ₹
            {cart.reduce(
              (total, currentItem) =>
                total + currentItem.price * currentItem.quantity,
              0
            )}
          </strong>
        </p>
        <p className="cart-price-main-discounted-price flex-between fs-small gap-1 p-8">
          <span>Discount</span>
          <strong style={{ color: "#388e3c" }}>-₹{totalDiscount}</strong>
        </p>
        <p className="cart-price-main-total-amount flex-between fs-small gap-1 pb-8 mi-8">
          <span>Total Amount</span>
          <strong style={{ color: "#388e3c" }}>
            {cart.reduce(
              (total, currentItem) =>
                total + currentItem.price * currentItem.quantity,
              0
            ) - totalDiscount}
          </strong>
        </p>
        <p className="cart-price-main-text flex-between fs-small gap-1 pb-8 mi-8">
          <span style={{ color: "#388e3c" }}>
            You are going to save &nbsp;
            <strong>
              ₹
              {cart.reduce(
                (total, currentItem) =>
                  total + currentItem.price * currentItem.quantity,
                0
              ) - totalDiscount}
            </strong>
            &nbsp; on this order!
          </span>
        </p>
      </div>
    </section>
  ) : (
    <div className="small-container">
      <img
        src={noItemsInCart}
        alt="no-cart-image"
        className="mb-1 margin-inline-auto max-w-680 w-100"
      />
      <p className="p-8 fs-text-2 text-center fw-600">No items to cart!</p>
      <button
        className="go-to-shopping-btn block margin-inline-auto p-10 border-none outline-none br-5 fs-small"
        onClick={() => navigate("/")}
      >
        Go for shopping!
      </button>
    </div>
  );
};

export default Cart;
