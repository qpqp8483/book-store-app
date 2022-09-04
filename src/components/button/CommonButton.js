import React from "react";
import "./commonButton.scss";

const CommonButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["common_btn", `common_btn_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

CommonButton.defaultProps = {
  type: "default",
};
export default CommonButton;
