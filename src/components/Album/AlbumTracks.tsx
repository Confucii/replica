import { SongData } from "../../interfaces";
import AlbumTrack from "./AlbumTrack";
import "./styles/AlbumTracks.css";

function AlbumTracks({
  songs,
  album,
  artist,
}: {
  songs: SongData[];
  album: string;
  artist: string;
}) {
  return (
    <div className="AlbumTracks">
      {songs.map((song: SongData, id: number) => {
        return (
          <AlbumTrack
            album={album}
            artist={artist}
            key={id}
            song={song}
            id={id + 1}
          />
        );
      })}
    </div>
  );
}

export default AlbumTracks;
