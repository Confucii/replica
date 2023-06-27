import { SongFullData } from "../../interfaces";
import "./styles/LibraryTrack.css";
import play from "../images/play.svg";
import fallbackImg from "../images/fallback.png";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utility";

function LibraryTrack({ track }: { track: SongFullData }) {
  const nav = useNavigate();

  function handleRedirectItem() {
    nav("/player", {
      state: { song: { ...track, album: track.album, artist: track.artist } },
    });
  }

  function handleRedirectAlbum() {
    if (track.album === "single") {
      nav("/artist", { state: track.artist });
    } else {
      nav("/album", { state: { album: track.album, artist: track.artist } });
    }
  }

  function handleRedirecArtist() {
    nav("/artist", { state: track.artist });
  }

  return (
    <div className="LibraryTrack">
      <div
        className="library-poster-img"
        onClick={handleRedirectItem}
        // change to imageURL
        style={{
          backgroundImage: `url("${track.imageURL}"), url("${fallbackImg}")`,
        }}
      >
        <img className="library-play play-btn" src={play} alt="play" />
      </div>
      <div className="library-track-title" onClick={handleRedirectItem}>
        {capitalize(track.name)}
      </div>
      <div className="library-track-sources">
        <div onClick={handleRedirecArtist} className="library-track-artist">
          {capitalize(track.artist)}
        </div>
        {"|"}
        <div onClick={handleRedirectAlbum} className="library-track-album">
          {capitalize(track.album)}
        </div>
      </div>
    </div>
  );
}

export default LibraryTrack;
