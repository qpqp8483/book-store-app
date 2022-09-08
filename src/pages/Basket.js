import React, { useContext, useState } from "react";
import CommonButton from "../components/button/CommonButton";
import { DiaryStateContext } from "../App";
import "./basket.scss";

const Basket = ({ coinSubmit, coin, data }) => {
  const { onRemove } = useContext(DiaryStateContext);
  const [num, setNum] = useState({ name: 1 });
  const numHandleFnPositive = (e) => {
    setNum({
      ...num,
      [e.target.name]: parseInt(e.target.value),
    });
  };
  const numHandleFnNegative = (e) => {
    if (parseInt(e.target.value) === 0) {
      alert("최소갯수는 1개이상부터입니다.");
      setNum({
        ...num,
        [e.target.name]: 1,
      });
    } else {
      setNum({
        ...num,
        [e.target.name]: "",
      });
    }
  };
  const blurHandle = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setNum({
        ...num,
        [e.target.name]: 1,
      });
    }
  };
  const numCount = (e) => {
    let countType = e.target.parentNode.previousSibling;
    if (e.target.className === "count_up") {
      setNum({ ...num, [countType.name]: parseInt(countType.value) + 1 });
    } else {
      setNum({
        ...num,
        [countType.name]:
          parseInt(countType.value) > 1
            ? parseInt(countType.value) - 1
            : alert("최소구매는 1개 이상입니다.") && 1,
      });
    }
  };
  return (
    <div className="basket_box">
      <div className="wallet">보유금액 : {coinSubmit ? coin : `0`}원</div>
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
                        onChange={(e) =>
                          e.target.value >= 1
                            ? numHandleFnPositive(e)
                            : numHandleFnNegative(e)
                        }
                        onBlur={(e) => {
                          blurHandle(e);
                        }}
                      />
                      <div className="num_control">
                        <span
                          className="count_up"
                          onClick={(e) => {
                            numCount(e);
                          }}
                        >
                          △
                        </span>
                        <span
                          className="count_down"
                          onClick={(e) => {
                            numCount(e);
                          }}
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
                        text={"삭제"}
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
    </div>
  );
};

export default Basket;
