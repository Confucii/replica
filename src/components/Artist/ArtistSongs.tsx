import { useNavigate } from "react-router-dom";
import ArtistTrack from "./ArtistTrack";
import "./styles/ArtistSongs.css";

function ArtistSongs({
  artistSongs,
  artist,
}: {
  artistSongs: any;
  artist: any;
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
        {artistSongs.slice(0, 5).map((song: any) => {
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
