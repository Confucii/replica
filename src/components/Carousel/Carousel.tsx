import { useState } from "react";
import { capitalize } from "../../utility";
import left from "./images/chevron-left-circle-outline.svg";
import right from "./images/chevron-right-circle-outline.svg";
import "./styles/Carousel.css";
import CarouselItemCard from "./CarouselItemCard";
import { useNavigate } from "react-router-dom";

function Carousel({
  data,
  type,
  name,
}: {
  data: any;
  type: string;
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const nav = useNavigate();

  function handleRedirect() {
    if (type === "home") {
      nav("/artist", { state: data.artist });
    }
  }

  const offset =
    (document.querySelector(".carousel-items")?.clientWidth || 1200) + 20;

  function handleScrollLeft() {
    if (index !== 0) {
      setIndex((index) => index - 1);
    }
  }

  function handleScrollRight() {
    if (index + 1 < data.items.length / 6) {
      setIndex((index) => index + 1);
    }
  }

  return (
    <div className="Carousel">
      <div className="carousel-header">
        <div
          className={`carousel-name ${type === "home" && "home"}`}
          onClick={handleRedirect}
        >
          {capitalize(name)}
        </div>
        <div className="carousel-controls">
          <img
            className={`carousel-chevron ${index === 0 && "disabled"}`}
            src={left}
            alt="left"
            onClick={handleScrollLeft}
          />
          <img
            className={`carousel-chevron ${
              index + 1 > data.items.length / 6 && "disabled"
            }`}
            src={right}
            alt="left"
            onClick={handleScrollRight}
          />
        </div>
      </div>
      <div className="carousel-items">
        <div
          className="carousel-images"
          style={{ transform: `translate(${-(index * (offset || 0))}px, 0)` }}
        >
          {data.items.map((item: any) => {
            return (
              <CarouselItemCard
                type={type}
                key={item.name}
                data={item}
                artist={data.artist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
