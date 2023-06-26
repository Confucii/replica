import { capitalize } from "../../utility";
import "./styles/MixTrack.css";
import test from "../../laser-gun.png";
import play from "../images/play.svg";
import { useNavigate } from "react-router-dom";
import { SongFullData } from "../../interfaces";

function MixTrack({ data }: { data: SongFullData }) {
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
    nav("/player", {
      state: { song: { ...data, album: data.album, artist: data.artist } },
    });
  }

  return (
    <div className="MixTrack">
      <div
        onClick={handleMainRedirect}
        className="mix-track-img"
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${data.imageURL}")`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div onClick={handleMainRedirect} className="mix-track-name">
        {capitalize(data.name)}
      </div>
      <div className="mix-track-sources">
        <div onClick={handleArtistRedirect} className="mix-track-artist">
          {capitalize(data.artist)}
        </div>
        {" | "}
        <div onClick={handleAlbumRedirect} className="mix-track-album">
          {capitalize(data.album)}
        </div>
      </div>
    </div>
  );
}

export default MixTrack;
