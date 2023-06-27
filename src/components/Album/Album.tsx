import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Album.css";
import test from "../../laser-gun.png";
import { capitalize } from "../../utility";
import { useEffect, useState } from "react";
import { getArtistData } from "../../firebase/firebase";
import AlbumTracks from "./AlbumTracks";
import { AlbumData, SongData } from "../../interfaces";

function Album() {
  const [albumData, setAlbumData] = useState<AlbumData>();
  const location = useLocation();
  const nav = useNavigate();

  function handleQueueAddition() {
    if (albumData) {
      let albumSongs = albumData.songs.map((song: SongData) => {
        return {
          ...song,
          album: albumData.name,
          artist: location.state.artist,
        };
      });
      nav("/player", { state: albumSongs });
    }
  }

  function handleArtistRedirect() {
    nav("/artist", { state: location.state.artist });
  }

  useEffect(() => {
    async function getAlbumData() {
      const artistData = await getArtistData(location.state.artist);

      const chosenAlbumData = artistData.albums.filter((album: AlbumData) => {
        return album.name === location.state.album;
      });

      setAlbumData(chosenAlbumData[0]);
    }

    getAlbumData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Album">
      {albumData && (
        <div className="album-data">
          <div
            className="album-poster"
            style={{
              //backgroundImage: `url("${albumData.imageURL}")`,
              backgroundImage: `url("${test}")`,
            }}
          ></div>
          <div className="album-description">
            <div className="album-title">{capitalize(albumData.name)}</div>
            <div className="album-artist-number">
              <div>
                <span>Album | </span>{" "}
                <span className="album-artist" onClick={handleArtistRedirect}>
                  {capitalize(location.state.artist)}
                </span>
              </div>
              <div className="album-audio-number">
                {"Length: " + albumData.songs.length + " sounds"}
              </div>
            </div>

            <div className="album-text">
              {"Description: " + albumData.description}
            </div>
            <button className="album-btn" onClick={handleQueueAddition}>
              Play
            </button>
          </div>
        </div>
      )}
      {albumData && (
        <AlbumTracks
          album={albumData.name}
          artist={location.state.artist}
          songs={albumData.songs}
        />
      )}
    </div>
  );
}

export default Album;
