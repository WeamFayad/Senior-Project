import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function ImageGrid() {
  const navigate = useNavigate();

  return (
    <div
      className="grid-gallery"
      onClick={() => {
        navigate("/shop");
      }}
    >
      <div className="grid-header">
        <img src="./favicon.png" alt="logo"></img>
        <h3>Variety Of Items</h3>
      </div>
      <div class="gallery">
        <div class="gallery__item gallery__item--1">
          <img src="./images/grid/1.png" alt="" class="gallery1" />
        </div>
        <div class="gallery__item gallery__item--2">
          <img src="./images/grid/2.png" alt="" class="gallery2" />
        </div>
        <div class="gallery__item gallery__item--3">
          <img src="./images/grid/3.png" alt="" class="gallery3" />
        </div>
        <div class="gallery__item gallery__item--4">
          <img src="./images/grid/4.png" alt="" class="gallery4" />
        </div>
        <div class="gallery__item gallery__item--5">
          <img src="./images/grid/5.png" alt="" class="gallery5" />
        </div>
        <div class="gallery__item gallery__item--6">
          <img src="./images/grid/6.png" alt="" class="gallery6" />
        </div>
        <div class="gallery__item gallery__item--7">
          <img src="./images/grid/7.png" alt="" class="gallery7" />
        </div>
        <div class="gallery__item gallery__item--8">
          <img src="./images/grid/8.png" alt="" class="gallery8" />
        </div>
        <div class="gallery__item gallery__item--9">
          <img src="./images/grid/9.png" alt="" class="gallery9" />
        </div>
        <div class="gallery__item gallery__item--10">
          <img src="./images/grid/10.png" alt="" class="gallery__img" />
        </div>
        <div class="gallery__item gallery__item--11">
          <img src="./images/grid/11.png" alt="" class="gallery__img" />
        </div>
        <div class="gallery__item gallery__item--12">
          <img src="./images/grid/12.png" alt="" class="gallery__img" />
        </div>
        <div class="gallery__item gallery__item--13">
          <img src="./images/grid/13.png" alt="" class="gallery__img" />
        </div>
        <div class="gallery__item gallery__item--14">
          <img src="./images/grid/14.png" alt="" class="gallery__img" />
        </div>
      </div>
    </div>
  );
}

export default ImageGrid;
