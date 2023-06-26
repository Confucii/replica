import { useNavigate } from "react-router-dom";
import "./styles/TrackDisplay.css";
import { capitalize } from "../../utility";
import test from "../../laser-gun.png";
import { SongFullData } from "../../interfaces";

function TrackDisplay({ track }: { track: SongFullData }) {
  const nav = useNavigate();

  function handleArtistRedirect() {
    nav("/artist", { state: track.artist });
  }

  function handleAlbumRedirect() {
    if (track.album === "single") {
      nav("/artist", { state: track.artist });
    } else {
      nav("/album", { state: { album: track.album, artist: track.artist } });
    }
  }

  return (
    <div className="TrackDisplay">
      <div
        className="player-track-img"
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${track.imageURL}")`,
        }}
      />
      <div className="player-track-name">{capitalize(track.name)}</div>
      <div className="player-track-sources">
        <div onClick={handleArtistRedirect} className="player-track-artist">
          {capitalize(track.artist)}
        </div>
        {" | "}
        <div onClick={handleAlbumRedirect} className="player-track-album">
          {capitalize(track.album)}
        </div>
      </div>
    </div>
  );
}

export default TrackDisplay;
