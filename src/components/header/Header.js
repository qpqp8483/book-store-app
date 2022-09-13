import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DiaryDispatchContext } from "../../App";
import CommonButton from "../button/CommonButton";
import "./header.scss";
import imgCoin from "../../assets/img/icon_coin.png";

const Header = () => {
  const { coin, coinSubmit, coinValue } = useContext(DiaryDispatchContext);
  return (
    <header>
      <h1>찬우네 책가게</h1>
      <div className="wallet">
        <span className="coin">
          <img src={imgCoin} alt="보유금액 아이콘" />
          {coinSubmit
            ? coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : `0`}
          원
        </span>
        <CommonButton
          type={"positive"}
          text={"충전하기"}
          onClick={() => coinValue(false)}
        />
      </div>
      <Link to="/basket" className="btn_basket">
        장바구니
      </Link>
    </header>
  );
};

export default Header;
