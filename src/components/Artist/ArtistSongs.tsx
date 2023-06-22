import { useNavigate } from "react-router-dom";
import ArtistTrack from "./ArtistTrack";
import "./styles/ArtistSongs.css";

function ArtistSongs({
  artistSongs,
  artistName,
}: {
  artistSongs: any;
  artistName: any;
}) {
  const nav = useNavigate();

  function handleRedirect() {
    nav("songs", { state: { songs: artistSongs, artist: artistName } });
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
              artistName={artistName}
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
