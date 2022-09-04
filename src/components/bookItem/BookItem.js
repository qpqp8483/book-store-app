import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import default_img from "../../assets/img/noimg.jpeg";
import CommonButton from "../button/CommonButton";
import { DiaryStateContext } from "../../App";
import "./bookItem.scss";

const BookItem = ({ book }) => {
  const { onCreate } = useContext(DiaryStateContext);
  const content_length = book.contents.slice(0, 80);
  const onErrorImg = (e) => {
    e.target.src = default_img;
  };
  const handleSubmit = (title, price) => {
    onCreate(title, price);
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
        <Link to="/" className="title">
          {book.title}
        </Link>
        <ul>
          <li>{book.authors}</li>
          <li>
            {book.sale_price < 0
              ? "금액 정보가 없습니다."
              : `${book.sale_price} 원`}
          </li>
          <li>
            {content_length.length < 1
              ? "내용 정보가 없습니다."
              : `${content_length}...`}
          </li>
        </ul>
        <div>
          <CommonButton
            type={"positive"}
            text={"구매하기"}
            onClick={() => handleSubmit(book.title, book.sale_price)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
