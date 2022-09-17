import "./App.css";
import "../src/assets/css/reset.css";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinPopup from "./components/coinPopup/CoinPopup";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import Header from "./components/header/Header";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...state, { ...action.data }];
      break;
    }
    case "EDIT": {
      console.log(action);
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "RESET": {
      newState = [];
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [coin, setCoin] = useState("");
  const [coinSubmit, setCoinSubmit] = useState(false);
  const [num, setNum] = useState({});

  useEffect(() => {
    const bookList = [];
    dispatch({ type: "INIT", data: bookList });
  }, []);

  const dataId = useRef(1);

  //CREATE
  const onCreate = (title, price, isbn) => {
    let dataFilter = data.filter((item) => item.title === title);
    if (dataFilter.length > 0) {
      alert("이미 장바구니에 담긴 책 입니다.");
    } else {
      dispatch({
        type: "CREATE",
        data: {
          id: dataId.current,
          name: isbn,
          title: title,
          price: price,
          num: 1,
        },
      });
      alert("장바구니에 담겼습니다.");
      dataId.current += 1;
    }
    console.log(num);
  };

  //EDIT
  const onEdit = (num, title, price, targetId) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        title: title,
        price: price,
        num: num,
      },
    });
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
    console.log(num);
  };

  //RESET
  const onReset = () => {
    dispatch({
      type: "RESET",
    });
  };

  const coinValue = (e) => {
    setCoinSubmit(e);
  };

  const coinPayment = (stateCoin, actionCoin) => {
    setCoin(stateCoin - actionCoin);
    alert("구매가 완료되었습니다.");
    onReset();
    setNum({});
  };

  const coinChange = (e) => {
    if (e > 1000000) {
      alert("100만원을 초과할 수 없습니다.");
      return;
    } else {
      setCoin(e);
    }
  };

  return (
    <DiaryStateContext.Provider value={{ onCreate, onEdit, onRemove, onReset }}>
      <DiaryDispatchContext.Provider
        value={{
          data,
          num,
          setNum,
          coin,
          coinSubmit,
          coinPayment,
          coinValue,
          setCoin,
          coinChange,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Header />
            <CoinPopup />
            <Routes>
              <Route exact path="/search" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
