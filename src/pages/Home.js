import React, { useContext, useEffect, useState } from "react";
import BookItem from "../components/bookItem/BookItem";
import { bookSearch } from "../KakaoApi";
import { DiaryDispatchContext } from "../App";
import "./home.scss";
import { useRoutes, useSearchParams } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import QueryString from "qs";
const Home = () => {
  const { num, setNum } = useContext(DiaryDispatchContext);
  const [books, setBooks] = useState([]); // 책 리스트 state 기본값 설정
  const [listUpdate, setListUpdate] = useState(true); // 책 리스트 업데이트될때 상태변환 설정
  const [queryText, setQueryText] = useState("");
  const [text, setText] = useState("");
  const params = useParams();
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(queryData);
  console.log(params, location);
  useEffect(() => {
    if (queryText.length > 0) {
      kakaoSearch(queryText, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [queryText]);

  const kakaoSearch = async (query, reset, pageNum) => {
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: queryData.page,
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

  const numChange = (isbn) => {
    setNum({
      ...num,
      [isbn]: 1,
    });
  };

  return (
    <div className="search_section">
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
            <BookItem book={book} key={index} numChange={numChange} />
          ))}
        </div>
      </div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default Home;
