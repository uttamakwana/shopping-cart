import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
// pages
import { Cart, Home, NotFound, ProductDetails } from "./pages";
// loader
import { Loader } from "./constants";
import { Header } from "./components";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <main className="app">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:q" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Suspense>
  );
};

export default App;
