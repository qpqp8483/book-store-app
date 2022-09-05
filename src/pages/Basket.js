import React, { useContext } from "react";
import CommonButton from "../components/button/CommonButton";
import { DiaryStateContext } from "../App";
import "./basket.scss";

const Basket = ({ coinSubmit, coin, data }) => {
  const { onEdit } = useContext(DiaryStateContext);
  const numHandle = (e) => {
    onEdit(e);
    console.log(e);
  };
  console.log(data);
  return (
    <div className="basket_box">
      <div className="wallet">보유금액 : {coinSubmit ? coin : `0`}원</div>
      <div className="basket">
        <table>
          <caption>구매 리스트 정보</caption>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" colSpan="2">
                상품정보
              </th>
              <th scope="col">수량</th>
              <th scope="col">상품금액</th>
              <th scope="col">주문</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td></td>
                <td>
                  <h5 className="title">{item.title}</h5>
                </td>
                <td>
                  <div className="num_box">
                    <input
                      type="text"
                      value={item.num}
                      onChange={(e) => numHandle(e.target.value)}
                    />
                    <div className="num_control">
                      <span onClick={() => numHandle(true)}>△</span>
                      <span onClick={() => numHandle(false)}>▽</span>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="price">{item.price}</p>
                </td>
                <td>
                  <div className="basket_btn_box">
                    <CommonButton type={"positive"} text={"구매하기"} />
                    <CommonButton type={"negative"} text={"삭제"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Basket;
