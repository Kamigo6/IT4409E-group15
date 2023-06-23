import React from "react";

const Carousel = (props) => {
  return (
    <div
      id={props.id}
      className={`carousel slide ${props.className}`}
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">{props.children}</div>
    </div>
  );
};

export default Carousel;
