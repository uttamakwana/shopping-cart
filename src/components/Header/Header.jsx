// css
import "./header.css";
// images
import { Logo2, MobileLogo } from "../../constants/images.js";
// icon
import { Cart } from "../../constants/icons.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./input.jsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header flex ai-center sticky-top">
      <div className="header-container container flex-between gap-1">
        {/* Logo */}
        <img
          src={Logo2}
          alt="amazon"
          className="header-logo desktop-logo"
          onClick={() => navigate("/")}
          style={{ display: `${location.pathname !== "/" ? "block" : ""}` }}
        />
        {/* Input */}
        <Input />
        <Cart
          className="header-cart-icon pointer"
          onClick={() => navigate("/cart")}
        />
      </div>
    </header>
  );
};

export default Header;
