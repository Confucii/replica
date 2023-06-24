import "./styles/FoundItem.css";
import play from "../recurring/images/play.svg";
import { capitalize } from "../../utility";
import { useNavigate } from "react-router-dom";
import test from "../../laser-gun.png";

function FoundItem({ data, type }: { data: any; type: string }) {
  const nav = useNavigate();

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
        state: { album: data.album, artist: data.artist, song: data.name },
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
          <div onClick={handleArtistRedirect}>
            {" | "}
            <span className="found-item-artist">{capitalize(data.artist)}</span>
          </div>
        )}

        {type === "song" && (
          <div onClick={handleAlbumRedirect}>
            {" | "}
            <span className="found-item-album">{capitalize(data.album)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoundItem;
