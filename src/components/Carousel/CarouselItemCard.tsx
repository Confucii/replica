import { capitalize } from "../../utility";
import "./styles/CarouselItemCard.css";
import test from "../../laser-gun.png";
import play from "../recurring/images/play.svg";
import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CarouselItemCard({
  data,
  type,
  artist,
}: {
  data: any;
  type: string;
  artist: string;
}) {
  const [imageSize, setImageSize] = useState(0);

  const nav = useNavigate();

  function handleRedirectItem() {
    if (type === "home" || type === "single") {
      nav("/player", { state: data });
    } else if (type === "album") {
      nav("/album", { state: { album: data.name, artist: artist } });
    }
  }

  function handleRedirectSource() {
    if (data.source === "single") {
      nav("/artist", { state: artist });
    } else {
      nav("/album", { state: { album: data.source, artist: artist } });
    }
  }

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
  }, []);

  return (
    <div className="CarouselItemCard">
      <div
        className="poster-img"
        onClick={handleRedirectItem}
        // change to imageURL
        style={{
          //backgroundImage: `url("${test}")`,
          backgroundImage: `url("${data.imageURL}")`,
          height: `${imageSize}px`,
          width: `${imageSize}px`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div className="item-card-title" onClick={handleRedirectItem}>
        {capitalize(data.name)}
      </div>
      {type === "home" ? (
        <div onClick={handleRedirectSource} className="item-card-source">
          {capitalize(data.source)}
        </div>
      ) : (
        <span className="item-card-type">{capitalize(type)}</span>
      )}
    </div>
  );
}

export default CarouselItemCard;
