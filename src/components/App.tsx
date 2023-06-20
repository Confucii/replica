import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Layout";
import Library from "./Library/Library";
import { getData, initFirebaseAuth } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
import SearchPage from "./Search/SearchPage";
import { data } from "../data";

export const AppContext = createContext(false);

function App() {
  // context states
  const [user, setUser] = useState<any>(false);
  const [dropdown, setDropdown] = useState<any>(false);
  const [search, setSearch] = useState<any>({
    searchTerm: "",
    searchStatus: false,
  });
  // change to empty array
  const [artistsData, setArtistsData] = useState<any>(data);

  const context: any = {
    data: artistsData,
    user: user,
    dropdownHandler: { dropdown, setDropdown },
    searchHandler: { search, setSearch },
  };

  useEffect(() => {
    async function getArtistsData() {
      const artistsData = await getData();
      setArtistsData(artistsData);
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
    // getArtistsData();
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
            <Route index element={<Home />} />
            <Route path="library" element={<Library />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
