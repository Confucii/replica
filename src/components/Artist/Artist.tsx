import { useLocation } from "react-router-dom";
import "./styles/Artist.css";
import { capitalize } from "../../utility";
import { getArtistData } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import test from "../../laser-gun.png";
import ArtistSongs from "./ArtistSongs";
import Carousel from "../Carousel/Carousel";

function Artist() {
  const [artistData, setArtistData] = useState<any>(false);
  const [artistSongs, setArtistSongs] = useState<any>({
    artistFullSongsStatus: false,
    artistSongsList: [],
  });
  const location = useLocation();

  useEffect(() => {
    async function getArtistDataAsync() {
      const artistData = await getArtistData(location.state);
      let songList: any = [];

      artistData.albums.forEach((album: any) => {
        songList = songList.concat(
          album.songs.map((song: any) => {
            return {
              ...song,
              album: album.name,
            };
          })
        );
      });

      songList = songList.concat(
        artistData.singles.map((song: any) => {
          return {
            ...song,
            album: "single",
          };
        })
      );

      setArtistSongs({ ...artistSongs, artistSongsList: songList });
      setArtistData(artistData);
    }

    getArtistDataAsync();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Artist">
      {artistData && (
        <div
          className="artist-header"
          style={{
            //backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1)), url('${artistData.imageURL}')`,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1)), url('${test}')`,
          }}
        >
          <div className="artist-page-name">{capitalize(artistData.name)}</div>
          <div className="artist-page-description">
            {artistData.description}
          </div>
        </div>
      )}
      {artistSongs.artistSongsList && (
        <ArtistSongs
          artistSongs={artistSongs.artistSongsList}
          artistName={artistData.name}
        />
      )}
      {artistData && artistData.albums.length > 0 && (
        <Carousel
          type="album"
          name="albums"
          data={{ items: artistData.albums, artist: artistData.name }}
        />
      )}
      {artistData && (
        <Carousel
          type="single"
          name="singles"
          data={{ items: artistData.singles, artist: artistData.name }}
        />
      )}
    </div>
  );
}

export default Artist;
