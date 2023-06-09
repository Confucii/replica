import { capitalize } from "../../utility";
import "./styles/CarouselItemCard.css";
import fallbackImg from "../images/fallback.png";

import play from "../images/play.svg";
import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumData, SongData, SongFullData } from "../../interfaces";

function CarouselItemCard({
  data,
  type,
  artist,
}: {
  data: SongFullData | AlbumData | SongData;
  type: string;
  artist: string;
}) {
  const [imageSize, setImageSize] = useState(0);

  const nav = useNavigate();

  function handleRedirectItem() {
    if (type === "home" || type === "single") {
      "album" in data
        ? nav("/player", {
            state: { song: { ...data, album: data.album, artist: artist } },
          })
        : nav("/player", {
            state: { song: { ...data, album: "single", artist: artist } },
          });
    } else if (type === "album") {
      nav("/album", { state: { album: data.name, artist: artist } });
    }
  }

  function handleRedirectSource() {
    if ("album" in data) {
      if (data.album === "single") {
        nav("/artist", { state: artist });
      } else {
        nav("/album", { state: { album: data.album, artist: artist } });
      }
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
          backgroundImage: `url("${data.imageURL}"), url("${fallbackImg}")`,
          height: `${imageSize}px`,
          width: `${imageSize}px`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div className="item-card-title" onClick={handleRedirectItem}>
        {capitalize(data.name)}
      </div>
      {"album" in data ? (
        <div onClick={handleRedirectSource} className="item-card-source">
          {capitalize(data.album)}
        </div>
      ) : (
        <span className="item-card-type">{capitalize(type)}</span>
      )}
    </div>
  );
}

export default CarouselItemCard;
