import { useContext, useEffect, useState } from "react";
import "./styles/Home.css";
import { AppContext } from "../App";
import Carousel from "../Carousel/Carousel";
import { shuffleArray } from "../../utility";
import Filters from "./Filters";
import Mix from "./Mix";

function Home() {
  const context = useContext<any>(AppContext);
  const [allSongs, setAllSongs]: any = useState([]);
  const [mix, setMix]: any = useState([]);
  const [filter, setFilter]: any = useState(false);

  useEffect(() => {
    let songs: any[] = [];
    context.data.forEach((artist: any) => {
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

    if (filter) {
      songs = songs.filter((artist) => filter === artist.artist);
    }
    setAllSongs(songs);

    setMix(
      shuffleArray(
        songs
          .map((item) => {
            return item.items;
          })
          .flat()
      ).slice(0, 12)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="Home">
      <Filters filter={filter} setFilter={setFilter} />
      {!filter && <Mix mix={mix} />}
      {allSongs.map((data: any) => {
        return <Carousel key={data.artist} data={data} />;
      })}
    </div>
  );
}

export default Home;
