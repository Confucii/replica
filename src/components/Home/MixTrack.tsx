import { capitalize } from "../../utility";
import "./styles/MixTrack.css";
import test from "../../laser-gun.png";
import play from "../recurring/images/play.svg";
import { useNavigate } from "react-router-dom";

function MixTrack({ track }: { track: any }) {
  const nav = useNavigate();

  function handleArtistRedirect() {
    nav("/artist", { state: track.artist });
  }

  function handleAlbumRedirect() {
    if (track.source === "single") {
      nav("/artist", { state: track.artist });
    } else {
      nav("/album", { state: { album: track.source, artist: track.artist } });
    }
  }

  return (
    <div className="MixTrack">
      <div
        className="mix-track-img"
        // change to imageURL
        style={{
          backgroundImage: `url("${test}")`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div className="mix-track-name">{capitalize(track.name)}</div>
      <div className="mix-track-sources">
        <div onClick={handleArtistRedirect} className="mix-track-artist">
          {capitalize(track.artist)}
        </div>
        {" | "}
        <div onClick={handleAlbumRedirect} className="mix-track-album">
          {capitalize(track.source)}
        </div>
      </div>
    </div>
  );
}

export default MixTrack;
