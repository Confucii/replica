import ArtistTrack from "./ArtistTrack";
import "./styles/ArtistSongs.css";

function ArtistSongs({
  artistSongs,
  artistName,
}: {
  artistSongs: any;
  artistName: any;
}) {
  return (
    <div className="ArtistSongs">
      <div className="artist-songs-name">Songs</div>
      <div className="artist-songs">
        {artistSongs.slice(0, 5).map((song: any) => {
          return (
            <ArtistTrack artistName={artistName} key={song.name} song={song} />
          );
        })}
        <button className="artist-songs-more">Show all</button>
      </div>
    </div>
  );
}

export default ArtistSongs;
