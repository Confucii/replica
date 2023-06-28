import { useContext, useEffect, useState } from "react";
import "./styles/Library.css";
import { SongFullData } from "../../interfaces";
import { AppContext } from "../App";
import { getUserLikedTracks } from "../../firebase/firebase";
import EmptyLibrary from "./EmptyLibrary";
import LibraryTrack from "./LibraryTrack";
import { useNavigate } from "react-router-dom";

function Library() {
  const [tracks, setTracks] = useState<SongFullData[]>();
  const context = useContext(AppContext);

  const nav = useNavigate();

  function handleQueueAddition() {
    if (tracks) {
      nav("/player", { state: tracks });
    }
  }

  useEffect(() => {
    async function setLikedTracks() {
      if (context.user.uid) {
        const tracks = await getUserLikedTracks(context.user.uid);
        setTracks(tracks);
      }
    }
    setLikedTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <div className="Library">
      {tracks && tracks.length > 0 ? (
        <div className="library-container">
          <div className="library-header">
            <div className="library-name">Library</div>
            <button className="library-btn" onClick={handleQueueAddition}>
              Play
            </button>
          </div>
          <div className="library-track-grid">
            {tracks.map((track: SongFullData) => {
              return <LibraryTrack key={track.name} track={track} />;
            })}
          </div>
        </div>
      ) : (
        <EmptyLibrary />
      )}
    </div>
  );
}

export default Library;
