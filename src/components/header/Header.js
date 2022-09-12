import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header>
      <h1>찬우네 책가게</h1>
      <Link to="/basket" className="btn_basket">
        장바구니
      </Link>
    </header>
  );
};

export default Header;
