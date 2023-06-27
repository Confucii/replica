import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Layout";
import Library from "./Library/Library";
import { getData, initFirebaseAuth, setUserData } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
import SearchPage from "./Search/SearchPage";
import Album from "./Album/Album";
import Artist from "./Artist/Artist";
import { shuffleArray } from "../utility";
import SongsList from "./Artist/SongsList";
import Player from "./Player/Player";
import {
  AlbumData,
  AlbumDataTransmute,
  ArtistData,
  ContextInterface,
  CarouselData,
  PureData,
  SearchHandler,
  SongData,
  SongFullData,
  UserData,
} from "../interfaces";

export const AppContext = createContext({} as ContextInterface);

function App() {
  // context states
  const [user, setUser] = useState<UserData>({
    uid: null,
    name: null,
    email: null,
    img: null,
  });
  const [queue, setQueue] = useState<SongFullData[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchHandler>({
    searchTerm: "",
    searchStatus: false,
  });
  // change to empty array
  const [artistsData, setArtistsData] = useState<PureData[]>([]);
  const [albumsData, setAlbumsData] = useState<AlbumDataTransmute[]>([]);
  const [homeSongs, setHomeSongs] = useState<CarouselData[]>([]);
  const [allSongs, setAllSongs] = useState<SongFullData[]>([]);
  const context: ContextInterface = {
    user: user,
    dropdownHandler: { dropdown, setDropdown },
    searchHandler: { search, setSearch },
  };

  useEffect(() => {
    async function getFullData() {
      const fullData = await getData();
      let artists: PureData[] = [];
      let albums: AlbumDataTransmute[] = [];
      let songs: CarouselData[] = [];
      fullData.forEach((artist: ArtistData) => {
        let singles = artist.singles.map((single: SongData) => {
          return {
            ...single,
            album: "single",
            artist: artist.name,
          };
        });

        let albumSongs: SongFullData[] = [];
        artist.albums.forEach((album: AlbumData) => {
          albums.push({
            imageURL: album.imageURL,
            name: album.name,
            artist: artist.name,
          });
          albumSongs = albumSongs.concat(
            album.songs.map((song: SongData) => {
              return {
                ...song,
                album: album.name,
                artist: artist.name,
              };
            })
          );
        });

        artists.push({ name: artist.name, imageURL: artist.imageURL });

        songs.push({
          items: [...shuffleArray([...singles, ...albumSongs])],
          artist: artist.name,
        });
      });
      setHomeSongs(songs);

      setArtistsData(artists);
      setAlbumsData(albums);

      setAllSongs(
        shuffleArray(
          songs
            .map((item) => {
              return item.items;
            })
            .flat()
        )
      );
    }

    initFirebaseAuth(async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
        setUserData(user.uid);
      } else {
        setUser({ uid: null, name: null, email: null, img: null });
      }
    });
    //THIS INSTEAD OF data.tsx FILE
    getFullData();
  }, []);

  function handleStatusChange() {
    dropdown && setDropdown(!dropdown);
    search.searchStatus &&
      setSearch({
        ...context.searchHandler.search,
        searchStatus: !context.searchHandler.search.searchStatus,
      });
  }

  return (
    <div className="App" onClick={handleStatusChange}>
      <AppContext.Provider value={context}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home mixSongs={allSongs.slice(0, 12)} homeSongs={homeSongs} />
              }
            />
            <Route path="library" element={<Library />} />
            <Route
              path="search"
              element={
                <SearchPage
                  allSongs={allSongs}
                  artistsData={artistsData}
                  albumsData={albumsData}
                  search={search.searchTerm}
                />
              }
            />
            <Route path="album" element={<Album />} />
            <Route
              path="player"
              element={<Player setQueue={setQueue} queue={queue} />}
            />
            <Route path="artist">
              <Route index element={<Artist />} />
              <Route path="songs" element={<SongsList />} />
            </Route>
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
