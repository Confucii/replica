import { useLocation, useNavigate } from "react-router-dom";
import "./styles/SongsList.css";
import ArtistTrack from "./ArtistTrack";
import { SongDataTransmute } from "../../interfaces";

function SongsList() {
  const location = useLocation();

  const nav = useNavigate();

  function handleQueueAddition() {
    let artistData = location.state.songs.map((song: SongDataTransmute) => {
      return {
        ...song,
        artist: location.state.artist,
      };
    });

    nav("/player", { state: artistData });
  }

  return (
    <div className="SongsList">
      <div className="songs-list-header">
        <span className="songs-list-name">Songs</span>{" "}
        <button className="album-btn artist-btn" onClick={handleQueueAddition}>
          Play
        </button>
      </div>
      <div className="songs-list">
        {location.state.songs.map((song: SongDataTransmute) => {
          return (
            <ArtistTrack
              key={song.name}
              song={song}
              duration={true}
              artist={location.state.artist}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
