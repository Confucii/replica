import "./styles/ArtistTrack.css";
import play from "../recurring/images/play.svg";
import { capitalize } from "../../utility";
import test from "../../laser-gun.png";
import { useNavigate } from "react-router-dom";

function ArtistTrack({ song, artistName }: { song: any; artistName: any }) {
  const nav = useNavigate();

  function handleRedirectSource() {
    if (song.album === "single") {
      nav("/artist", { state: artistName });
    } else {
      nav("/album", { state: { album: song.album, artist: artistName } });
    }
  }

  function handleRedirectArtist() {
    nav("/artist", { state: artistName });
  }

  return (
    <div className="ArtistTrack">
      <div className="artist-track-left">
        <div
          className="artist-track-image"
          style={{
            //backgroundImage: `url('${test}')`,
            backgroundImage: `url('${song.imageURL}')`,
          }}
        >
          <img className="artist-track-play" src={play} alt="play" />
        </div>
        <div className="artist-track-name">{capitalize(song.name)}</div>
      </div>
      <div className="artist-track-artist" onClick={handleRedirectArtist}>
        {capitalize(artistName)}
      </div>
      <div className="artist-track-album" onClick={handleRedirectSource}>
        {capitalize(song.album)}
      </div>
    </div>
  );
}

export default ArtistTrack;
