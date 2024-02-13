export function calculateDiscountedPrice(price, discount) {
  const discountedPrice = Math.floor(price - price / discount);
  return discountedPrice;
}
