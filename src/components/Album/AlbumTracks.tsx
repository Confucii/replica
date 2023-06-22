import AlbumTrack from "./AlbumTrack";
import "./styles/AlbumTracks.css";

function AlbumTracks({ songs }: { songs: any }) {
  return (
    <div className="AlbumTracks">
      {songs.map((song: any, id: number) => {
        return <AlbumTrack key={id} song={song} id={id + 1} />;
      })}
    </div>
  );
}

export default AlbumTracks;
