import React, { useEffect, useState } from "react";
import BookItem from "../components/bookItem/BookItem";
import { bookSearch } from "../KakaoApi";

const Home = () => {
  const [books, setBooks] = useState([]); // 책 리스트 state 기본값 설정
  const [listUpdate, setListUpdate] = useState(true); // 책 리스트 업데이트될때 상태변환 설정
  const [queryText, setQueryText] = useState("");
  const [text, setText] = useState("");

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
      console.log(data.documents);
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
    <div>
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
    </div>
  );
};

export default Home;
