import React, { useContext, useEffect } from "react";
import default_img from "../../assets/img/noimg.jpeg";
import { DiaryStateContext } from "../../App";
import "./bookItem.scss";

const BookItem = ({ book, numChange }) => {
  const { onCreate } = useContext(DiaryStateContext);
  const content_length = book.contents.slice(0, 80);
  const onErrorImg = (e) => {
    e.target.src = default_img;
  };
  const handleSubmit = (title, price, isbn) => {
    onCreate(title, price, isbn);
    numChange(isbn);
  };

  return (
    <div className="book_item">
      <span className="img_box">
        <img
          src={book.thumbnail}
          alt={`${book.title} 썸네일이미지`}
          onError={onErrorImg}
        />
      </span>
      <div>
        <h3 className="title">{book.title}</h3>
        <span className="authors">{book.authors}</span>
        <p>
          {content_length.length < 1
            ? "내용 정보가 없습니다."
            : `${content_length}...`}
        </p>
        <ul>
          <li>
            {book.sale_price < 0 ? " 금액 정보 없음" : ` ${book.sale_price} 원`}
          </li>
          <li>
            <button
              className="basket_btn"
              onClick={() =>
                handleSubmit(book.title, book.sale_price, book.isbn)
              }
            >
              담기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookItem;
