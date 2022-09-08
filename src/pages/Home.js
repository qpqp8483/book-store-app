import React, { useContext, useEffect, useMemo, useState } from "react";
import BookItem from "../components/bookItem/BookItem";
import CoinPopup from "../components/coinPopup/CoinPopup";
import { bookSearch } from "../KakaoApi";
import { DiaryDispatchContext } from "../App";
import Basket from "./Basket";
import "./home.scss";

const Home = () => {
  const diaryList = useContext(DiaryDispatchContext);
  const [books, setBooks] = useState([]); // 책 리스트 state 기본값 설정
  const [listUpdate, setListUpdate] = useState(true); // 책 리스트 업데이트될때 상태변환 설정
  const [queryText, setQueryText] = useState("");
  const [text, setText] = useState("");
  const [coin, setCoin] = useState("");
  const [coinSubmit, setCoinSubmit] = useState(false);

  const coinChange = (e) => {
    if (e > 1000000) {
      alert("100만원을 초과할 수 없습니다.");
      return;
    } else {
      setCoin(e);
    }
  };

  const coinValue = (e) => {
    setCoinSubmit(e);
  };

  useEffect(() => {
    if (queryText.length > 0) {
      kakaoSearch(queryText, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [queryText]);

  const kakaoSearch = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 10, // 한 페이지에 보여 질 문서의 개수
    };
    const { data } = await bookSearch(params); // api 호출
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryText(text);
    setListUpdate(false);
  };

  return (
    <div className="search_section">
      <CoinPopup
        coin={coin}
        coinChange={coinChange}
        coinValue={coinValue}
        coinSubmit={coinSubmit}
      />
      <div>
        <form action="#" onSubmit={handleSubmit} className="search_box">
          <div>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              placeholder="검색어를 입력해주세요"
            />
            <button onClick={() => setQueryText(text)}>검색</button>
          </div>
        </form>
        <div className="book_list">
          {books.map((book, index) => (
            <BookItem book={book} key={index} />
          ))}
        </div>
      </div>
      <Basket coin={coin} coinSubmit={coinSubmit} data={diaryList} />
    </div>
  );
};

export default Home;
