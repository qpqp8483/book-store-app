import React from "react";
import "./coinPopup.scss";
const CoinPopup = ({ coin, coinChange, coinValue, coinSubmit }) => {
  const coinHandle = (e) => {
    coinChange(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (coin < 100) {
      alert("100원 이상의 금액을 설정하여 주세요");
      return;
    } else {
      coinValue(true);
    }
  };
  return (
    <div className={`coin_popup ${coinSubmit ? "coin_pop_none" : ""}`}>
      <div>
        <p>
          충전하실 금액을 입력하여주세요 <br />
          <span>※100만원이상 초과할 수 없습니다.</span>
        </p>
        <form action="#" onSubmit={handleSubmit}>
          <input type="number" value={coin} onChange={coinHandle} />
          <button>확인</button>
        </form>
      </div>
      <span className="overlay"></span>
    </div>
  );
};

export default CoinPopup;
