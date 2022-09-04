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
    const bookList = {};
    dispatch({ type: "INIT", data: bookList });
  }, []);

  const dataId = useRef(0);

  return (
    <DiaryStateContext.Provider>
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
