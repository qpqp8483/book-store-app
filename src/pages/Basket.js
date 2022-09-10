import React, { useContext, useEffect, useState } from "react";
import CommonButton from "../components/button/CommonButton";
import { DiaryStateContext } from "../App";
import "./basket.scss";

const Basket = ({ coinSubmit, coin, data, coinPayment }) => {
  const { onEdit, onRemove } = useContext(DiaryStateContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [num, setNum] = useState({ name: 1 });

  // 상품 수량 갯수 > 0 일때 함수
  const numHandleFnPositive = (e, targetTitle, targetPrice, targetId) => {
    setNum({ ...num, [e.target.name]: parseInt(e.target.value) });
    onEdit(parseInt(e.target.value), targetTitle, targetPrice, targetId);
  };

  // 상품 수량 갯수 <= 0 일때 함수
  const numHandleFnNegative = (e, targetTitle, targetPrice, targetId) => {
    if (parseInt(e.target.value) === 0) {
      onEdit(1, targetTitle, targetPrice, targetId);
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
  const numCount = (e, targetTitle, targetPrice, targetId) => {
    let countType = e.target.parentNode.previousSibling;
    let numState;
    const numEdit = num[`neme_${targetId}`] || 1;
    if (e.target.className === "count_up") {
      setNum({ ...num, [countType.name]: parseInt(countType.value) + 1 });
      numState = true;
    } else {
      setNum({
        ...num,
        [countType.name]:
          parseInt(countType.value) > 1
            ? parseInt(countType.value) - 1
            : alert("최소구매는 1개 이상입니다.") && 1,
      });
      numState = false;
    }
    onEdit(
      numState
        ? numEdit + 1
        : numEdit > 1
        ? numEdit - 1
        : num[`neme_${targetId}`],
      targetTitle,
      targetPrice,
      targetId
    );
  };

  useEffect(() => {
    let priceList = [];
    let addPrice;
    data.map((item) => {
      priceList.push(parseInt(item.price * item.num));
      addPrice = priceList
        .reduce((a, b) => a + b)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    setTotalPrice(addPrice);
  }, [data]);

  // 구매하기 함수
  const bookCal = () => {
    let priceList = [];
    data.map((item) => priceList.push(parseInt(item.price * item.num)));
    let coinAction = priceList.reduce((a, b) => a + b);
    if (coin >= coinAction) {
      coinPayment(coin, coinAction);
    } else {
      alert("충전금액이 모자랍니다. 충전을 해주세요!");
    }
  };

  return (
    <div className="basket_box">
      <div className="wallet">
        보유금액 :{" "}
        {coinSubmit
          ? coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : `0`}
        원
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
                        name={`neme_${item.id}`}
                        value={
                          num[`neme_${item.id}`] > -1
                            ? num[`neme_${item.id}`]
                            : num.name
                        }
                        onChange={(e) => {
                          e.target.value >= 1
                            ? numHandleFnPositive(
                                e,
                                item.title,
                                item.price,
                                item.id
                              )
                            : numHandleFnNegative(
                                e,
                                item.title,
                                item.price,
                                item.id
                              );
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
                      {item.price
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
