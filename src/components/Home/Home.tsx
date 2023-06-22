import { useEffect, useState } from "react";
import "./styles/Home.css";
import Carousel from "../Carousel/Carousel";
import Filters from "./Filters";
import Mix from "./Mix";

function Home({ homeSongs, mixSongs }: { homeSongs: any; mixSongs: any }) {
  const [filter, setFilter]: any = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (filter) {
      setFilteredSongs(
        homeSongs.filter((artist: any) => filter === artist.artist)
      );
    } else {
      setFilteredSongs(homeSongs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, homeSongs]);

  return (
    <div className="Home">
      <Filters filter={filter} setFilter={setFilter} />
      {!filter && <Mix mix={mixSongs} />}
      {filteredSongs.map((data: any) => {
        return <Carousel key={data.artist} data={data} />;
      })}
    </div>
  );
}

export default Home;
