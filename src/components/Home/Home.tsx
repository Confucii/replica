import { useContext, useEffect, useState } from "react";
import "./styles/Home.css";
import { AppContext } from "../App";
import Carousel from "../Carousel/Carousel";
import { shuffleArray } from "../../utility";

function Home() {
  const context = useContext<any>(AppContext);
  const [allSongs, setAllSongs]: any = useState([]);

  useEffect(() => {
    let songs: any[] = [];
    context.data.forEach((artist: any) => {
      let singles = artist.singles.map((single: any) => {
        return {
          ...single,
          source: "single",
        };
      });

      let albumSongs: any[] = [];
      artist.albums.forEach((album: any) => {
        albumSongs = albumSongs.concat(
          album.songs.map((song: any) => {
            return {
              ...song,
              source: album.name,
            };
          })
        );
      });

      songs.push({
        items: [...shuffleArray([...singles, ...albumSongs])],
        artist: artist.name,
      });
    });
    setAllSongs(songs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Home">
      {allSongs.map((data: any) => {
        return <Carousel key={data.artist} data={data} />;
      })}
    </div>
  );
}

export default Home;
