import { useLocation } from "react-router-dom";
import "./styles/SongsList.css";
import ArtistTrack from "./ArtistTrack";

function SongsList() {
  const location = useLocation();

  return (
    <div className="SongsList">
      <span className="songs-list-name">Songs</span>
      <div className="songs-list">
        {location.state.songs.map((song: any) => {
          return (
            <ArtistTrack
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
