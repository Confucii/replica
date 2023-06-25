import "./styles/FoundItem.css";
import play from "../recurring/images/play.svg";
import { calculateTime, capitalize } from "../../utility";
import { useNavigate } from "react-router-dom";
import test from "../../laser-gun.png";
import { useEffect, useState } from "react";

function FoundItem({ data, type }: { data: any; type: string }) {
  const [durationValue, setDurationValue] = useState(0);

  const nav = useNavigate();

  useEffect(() => {
    if (type === "song") {
      const audio = new Audio();
      audio.src = data.audioURL;

      audio.addEventListener("loadedmetadata", () => {
        setDurationValue(audio.duration);
      });

      // Clean up the event listener
      return () => {
        audio.removeEventListener("loadedmetadata", () => {
          setDurationValue(audio.duration);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleArtistRedirect() {
    nav("/artist", { state: data.artist });
  }

  function handleAlbumRedirect() {
    if (data.album === "single") {
      nav("/artist", { state: data.artist });
    } else {
      nav("/album", { state: { album: data.album, artist: data.artist } });
    }
  }

  function handleMainRedirect() {
    if (type === "album") {
      nav("/album", { state: { album: data.name, artist: data.artist } });
    } else if (type === "artist") {
      nav("/artist", { state: data.name });
    } else {
      nav("/player", {
        state: { song: data },
      });
    }
  }

  return (
    <div className="FoundItem">
      <div
        className={`found-item-img ${type === "artist" && "artist"}`}
        onClick={handleMainRedirect}
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${data.imageURL}")`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div onClick={handleMainRedirect} className="found-item-name">
        {capitalize(data.name)}
      </div>
      <div className="found-item-sources">
        <div className="found-item-type">{capitalize(type)}</div>
        {type !== "artist" && (
          <div>
            {" | "}
            <span onClick={handleArtistRedirect} className="found-item-artist">
              {capitalize(data.artist)}
            </span>
          </div>
        )}

        {type === "song" && (
          <div>
            {" | "}
            <span onClick={handleAlbumRedirect} className="found-item-album">
              {capitalize(data.album)}
            </span>
            {" | "}
            <span className="found-item-duration">
              {calculateTime(durationValue)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoundItem;
