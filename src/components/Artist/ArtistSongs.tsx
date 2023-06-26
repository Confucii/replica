import { useNavigate } from "react-router-dom";
import ArtistTrack from "./ArtistTrack";
import "./styles/ArtistSongs.css";
import { SongDataTransmute } from "../../interfaces";

function ArtistSongs({
  artistSongs,
  artist,
}: {
  artistSongs: SongDataTransmute[];
  artist: string;
}) {
  const nav = useNavigate();

  function handleRedirect() {
    nav("songs", { state: { songs: artistSongs, artist: artist } });
  }

  return (
    <div className="ArtistSongs">
      <div className="artist-songs-name" onClick={handleRedirect}>
        Songs
      </div>
      <div className="artist-songs">
        {artistSongs.slice(0, 5).map((song: SongDataTransmute) => {
          return (
            <ArtistTrack
              duration={false}
              artist={artist}
              key={song.name}
              song={song}
            />
          );
        })}
        <button className="artist-songs-more" onClick={handleRedirect}>
          Show all
        </button>
      </div>
    </div>
  );
}

export default ArtistSongs;
