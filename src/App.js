import "./App.css";
import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Basket from "./pages/Basket";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
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

  useEffect(() => {
    const bookList = [
      {
        id: 1,
        title: "짱구는 못말려",
        price: "12000",
      },
      {
        id: 2,
        title: "짱구는 잘말려",
        price: "13000",
      },
      {
        id: 3,
        title: "짱구는 안말려",
        price: "14000",
      },
    ];
    dispatch({ type: "INIT", data: bookList });
  }, []);

  const dataId = useRef(4);

  //CREATE
  const onCreate = (title, price) => {
    console.log("title" + title);
    console.log("price" + price);
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        title: title,
        price: price,
      },
    });
    dataId.current += 1;
  };

  return (
    <DiaryStateContext.Provider value={{ onCreate }}>
      <DiaryDispatchContext.Provider value={data}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Basket />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
