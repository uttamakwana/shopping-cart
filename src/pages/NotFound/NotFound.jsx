import { Link } from "react-router-dom";
// css
import "./not-found.css";

const NotFound = () => {
  return (
    <div className="container absolute-center text-center flex-col">
      <h1 className="fs-heading fw-900">404</h1>
      <h2 className="fs-subheading fw-800">Not Found!</h2>
      <Link
        to="/"
        className="not-found-page-home-btn p-8 br-5 border-none outline-none"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
