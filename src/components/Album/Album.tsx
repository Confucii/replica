import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Album.css";
import test from "../../laser-gun.png";
import { capitalize } from "../../utility";
import { useEffect, useState } from "react";
import { getArtistData } from "../../firebase/firebase";
import AlbumTracks from "./AlbumTracks";

function Album() {
  const [albumData, setAlbumData] = useState<any>(false);
  const location = useLocation();

  console.log(location.state);

  const nav = useNavigate();

  function handleArtistRedirect() {
    nav("/artist", { state: location.state.artist });
  }

  useEffect(() => {
    async function getAlbumData() {
      const artistData = await getArtistData(location.state.artist);

      const chosenAlbumData = artistData.albums.filter((album: any) => {
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
          </div>
        </div>
      )}
      {albumData && <AlbumTracks songs={albumData.songs} />}
    </div>
  );
}

export default Album;
