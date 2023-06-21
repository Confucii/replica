import { capitalize } from "../../utility";
import "./styles/CarouselItemCard.css";
import test from "../../laser-gun.png";
import play from "../recurring/images/play.svg";
import { useState, useLayoutEffect, useEffect } from "react";

function CarouselItemCard({ song }: { song: any }) {
  const [imageSize, setImageSize] = useState(0);

  useLayoutEffect(() => {
    setImageSize(
      ((document.querySelector(".carousel-items")?.getBoundingClientRect()
        .width || 1200) -
        100) /
        6
    );
  }, []);

  useEffect(() => {
    function handleResize() {
      setImageSize(
        ((document.querySelector(".carousel-items")?.clientWidth || 1200) -
          100) /
          6
      );
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="CarouselItemCard">
      <div
        className="poster-img"
        // change to imageURL
        style={{
          backgroundImage: `url("${test}")`,
          height: `${imageSize}px`,
          width: `${imageSize}px`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div className="item-card-title">{capitalize(song.name)}</div>
      <div
        data-artist={song.artist}
        data-album={song.source}
        className="item-card-source"
      >
        {capitalize(song.source)}
      </div>
    </div>
  );
}

export default CarouselItemCard;
