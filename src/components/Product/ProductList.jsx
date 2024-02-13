import { useSelector } from "react-redux";
import { Loader } from "../../constants";
import "./product-list.css";
import Product from "./Product";

const ProductList = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productReducer
  );
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="readable-container fs-subheading text-center">
        Some Error!
      </p>
    );
  }

  return (
    <section className="product-list">
      <div className="small-container pi-1">
        {products && products.length > 0 ? (
          <div className="responsive-grid gap-2">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <>Error</>
        )}
      </div>
    </section>
  );
};

export default ProductList;
