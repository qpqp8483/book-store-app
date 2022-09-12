import React, { useContext, useEffect, useState } from "react";
import CommonButton from "../components/button/CommonButton";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import "./basket.scss";

const Basket = () => {
  const {
    data,
    num,
    setNum,
    coin,
    coinSubmit,
    coinPayment,
    coinValue,
    setCoin,
  } = useContext(DiaryDispatchContext);
  const { onRemove } = useContext(DiaryStateContext);
  const [totalPrice, setTotalPrice] = useState(0);

  // 상품 수량 갯수 > 0 일때 함수
  const numHandleFnPositive = (e) => {
    setNum({ ...num, [e.target.name]: parseInt(e.target.value) });
  };

  // 상품 수량 갯수 <= 0 일때 함수
  const numHandleFnNegative = (e) => {
    if (parseInt(e.target.value) === 0) {
      alert("최소갯수는 1개이상부터입니다.");
      setNum({ ...num, [e.target.name]: 1 });
    } else {
      setNum({ ...num, [e.target.name]: "" });
    }
  };

  // 수량 input focus out 될떼 함수
  const blurHandle = (e) => {
    if (e.target.value === "") {
      setNum({ ...num, [e.target.name]: 1 });
    }
  };

  // input 옆 숫자 카운터 함수
  const numCount = (e) => {
    let countType = e.target.parentNode.previousSibling;
    if (e.target.className === "count_up") {
      setNum({ ...num, [countType.name]: parseInt(countType.value) + 1 });
    } else {
      if (parseInt(countType.value) > 1) {
        setNum({ ...num, [countType.name]: parseInt(countType.value) - 1 });
      } else {
        alert("최소구매는 1개 이상입니다.");
        setNum({ ...num, [countType.name]: 1 });
      }
    }
  };

  useEffect(() => {
    let priceList = [];
    let addPrice;
    data.map((item) => {
      priceList.push(parseInt(item.price * num[item.name]));
      addPrice = priceList
        .reduce((a, b) => a + b)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    data.length > 0 ? setTotalPrice(addPrice) : setTotalPrice(0);
  }, [num]);

  // 구매하기 함수
  const bookCal = () => {
    if (data.length > 0) {
      let priceList = [];
      data.map((item) => priceList.push(parseInt(item.price * num[item.name])));
      let coinAction = priceList.reduce((a, b) => a + b);
      if (coin >= coinAction) {
        coinPayment(coin, coinAction);
      } else {
        alert("충전금액이 모자랍니다. 충전을 해주세요!");
      }
    } else {
      alert("구매하실 품목을 확인해주세요!");
    }
  };

  return (
    <div className="basket_box">
      <div className="wallet">
        <span>
          보유금액 :{" "}
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
      <div className="basket">
        <table>
          <caption>구매 리스트 정보</caption>
          <colgroup>
            <col />
            <col style={{ width: "120px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "100px" }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">상품정보</th>
              <th scope="col">수량</th>
              <th scope="col">상품금액</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            {data.length < 1 ? (
              <tr>
                <td colSpan={4} className="list_none">
                  장바구니에 담긴 책이 없습니다!
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <h5 className="title">{item.title}</h5>
                  </td>
                  <td>
                    <div className="num_box">
                      <input
                        className="num_input"
                        type="number"
                        name={item.name}
                        value={num[item.name]}
                        onChange={(e) => {
                          e.target.value >= 1
                            ? numHandleFnPositive(e)
                            : numHandleFnNegative(e);
                        }}
                        onBlur={(e) => {
                          blurHandle(e);
                        }}
                      />
                      <div className="num_control">
                        <span
                          className="count_up"
                          onClick={(e) =>
                            numCount(e, item.title, item.price, item.id)
                          }
                        >
                          △
                        </span>
                        <span
                          className="count_down"
                          onClick={(e) =>
                            numCount(e, item.title, item.price, item.id)
                          }
                        >
                          ▽
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="price">
                      {(item.price * num[item.name])
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </td>
                  <td>
                    <div className="basket_btn_box">
                      <CommonButton
                        type={"negative"}
                        text={"삭제하기"}
                        onClick={() => onRemove(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="basket_under">
        <span className="total_price">총 금액 : {totalPrice}원</span>
        <CommonButton
          type={"positive"}
          text={"구매하기"}
          onClick={() => bookCal()}
        />
      </div>
    </div>
  );
};

export default Basket;
