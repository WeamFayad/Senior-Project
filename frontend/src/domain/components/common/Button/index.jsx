import React from "react";

const Button = ({ text, handleOnClick, classes, type }) => {
  return (
    <button
      type={type}
      className={`btn ${classes ? classes.join(" ") : ""}`}
      onClick={(e) => {
        e.preventDefault();
        handleOnClick(e);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
//use <Button text="" handleOnClick={handleClick} classes={['', '']} type="button" />
