import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Layout";
import Library from "./Library/Library";
import { getData, initFirebaseAuth } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
import SearchPage from "./Search/SearchPage";
//import { data } from "../data";
import Album from "./Album/Album";
import Artist from "./Artist/Artist";
import { shuffleArray } from "../utility";
import SongsList from "./Artist/SongsList";

export const AppContext = createContext({});

function App() {
  // context states
  const [user, setUser] = useState<any>(false);
  const [dropdown, setDropdown] = useState<any>(false);
  const [search, setSearch] = useState<any>({
    searchTerm: "",
    searchStatus: false,
  });
  // change to empty array
  const [artistsData, setArtistsData] = useState<any>([]);
  const [albumsData, setAlbumsData] = useState<any>([]);
  const [homeSongs, setHomeSongs] = useState<any>([]);
  const [allSongs, setAllSongs] = useState<any>([]);
  const context: any = {
    user: user,
    dropdownHandler: { dropdown, setDropdown },
    searchHandler: { search, setSearch },
  };

  useEffect(() => {
    async function getFullData() {
      const fullData = await getData();
      let artists: any[] = [];
      let albums: any[] = [];
      let songs: any[] = [];
      fullData.forEach((artist: any) => {
        let singles = artist.singles.map((single: any) => {
          return {
            ...single,
            album: "single",
            artist: artist.name,
          };
        });

        let albumSongs: any[] = [];
        artist.albums.forEach((album: any) => {
          albums.push({
            imageURL: album.imageURL,
            name: album.name,
            artist: artist.name,
          });
          albumSongs = albumSongs.concat(
            album.songs.map((song: any) => {
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

    initFirebaseAuth((user: any) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      } else {
        setUser(false);
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
