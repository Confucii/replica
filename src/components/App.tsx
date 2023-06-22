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
  const [homeSongs, setHomeSongs] = useState<any>([]);
  const [mixSongs, setMixSongs] = useState<any>([]);

  const context: any = {
    user: user,
    dropdownHandler: { dropdown, setDropdown },
    searchHandler: { search, setSearch },
  };

  useEffect(() => {
    async function getFullData() {
      const fullData = await getData();
      let songs: any[] = [];
      fullData.forEach((artist: any) => {
        let singles = artist.singles.map((single: any) => {
          return {
            ...single,
            source: "single",
            artist: artist.name,
          };
        });

        let albumSongs: any[] = [];
        artist.albums.forEach((album: any) => {
          albumSongs = albumSongs.concat(
            album.songs.map((song: any) => {
              return {
                ...song,
                source: album.name,
                artist: artist.name,
              };
            })
          );
        });

        songs.push({
          items: [...shuffleArray([...singles, ...albumSongs])],
          artist: artist.name,
        });
      });
      setHomeSongs(songs);

      setMixSongs(
        shuffleArray(
          songs
            .map((item) => {
              return item.items;
            })
            .flat()
        ).slice(0, 12)
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
              element={<Home mixSongs={mixSongs} homeSongs={homeSongs} />}
            />
            <Route path="library" element={<Library />} />
            <Route path="search" element={<SearchPage />} />
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
