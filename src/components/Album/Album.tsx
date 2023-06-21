import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Album.css";
import test from "../../laser-gun.png";
import { capitalize } from "../../utility";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { data } from "../../data";

function Album() {
  //Set context as data source
  const context = useContext<any>(AppContext);
  const [albumData, setAlbumData] = useState<any>(false);
  const location = useLocation();

  const nav = useNavigate();

  function handleArtistRedirect() {
    nav("/artist", { state: location.state.artist });
  }

  useEffect(() => {
    const chosenAlbumData = data
      .filter((artist) => {
        return artist.name === location.state.artist;
      })[0]
      .albums.filter((album) => {
        return album.name === location.state.album;
      });

    setAlbumData(chosenAlbumData[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Album">
      {albumData && (
        <div className="album-data">
          <div
            className="album-poster"
            style={{
              backgroundImage: `url("${test}")`,
            }}
          ></div>
          <div className="album-description">
            <div className="album-title">{capitalize(albumData.name)}</div>
            <div className="album-artist-number">
              <div className="album-artist" onClick={handleArtistRedirect}>
                {"Album | " + capitalize(location.state.artist)}
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
      <div className="album-tracks"></div>
    </div>
  );
}

export default Album;
