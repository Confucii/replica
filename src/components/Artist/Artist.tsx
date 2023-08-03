import { useLocation } from "react-router-dom";
import "./styles/Artist.css";
import { capitalize } from "../../utility";
import { getArtistData } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import fallbackImg from "../images/fallback.png";
import ArtistSongs from "./ArtistSongs";
import Carousel from "../Carousel/Carousel";
import {
  AlbumData,
  ArtistData,
  ArtistFullSongList,
  SongData,
  SongDataTransmute,
} from "../../interfaces";

function Artist() {
  const [artistData, setArtistData] = useState<ArtistData | false>(false);
  const [artistSongs, setArtistSongs] = useState<ArtistFullSongList>({
    artistFullSongsStatus: false,
    artistSongsList: [],
  });
  const location = useLocation();

  useEffect(() => {
    async function getArtistDataAsync() {
      const artistData = await getArtistData(location.state);
      let songList: SongDataTransmute[] = [];

      artistData.albums.forEach((album: AlbumData) => {
        songList = songList.concat(
          album.songs.map((song: SongData) => {
            return {
              ...song,
              album: album.name,
            };
          })
        );
      });

      songList = songList.concat(
        artistData.singles.map((song: SongData) => {
          return {
            ...song,
            album: "single",
          };
        })
      );

      setArtistSongs((artistSongsVal) => {
        return { ...artistSongsVal, artistSongsList: songList };
      });
      setArtistData(artistData);
    }

    getArtistDataAsync();
  }, [location.state]);

  return (
    <div className="Artist">
      {artistData && (
        <div
          className="artist-header"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1)), url("${artistData.imageURL}"), url("${fallbackImg}")`,
          }}
        >
          <div className="artist-page-name">{capitalize(artistData.name)}</div>
          <div className="artist-page-description">
            {artistData.description}
          </div>
        </div>
      )}
      {artistData && artistSongs.artistSongsList && (
        <ArtistSongs
          artistSongs={artistSongs.artistSongsList}
          artist={artistData.name}
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
