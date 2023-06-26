import { useEffect, useState } from "react";
import "./styles/Home.css";
import Carousel from "../Carousel/Carousel";
import Filters from "./Filters";
import Mix from "./Mix";
import { CarouselData, SongFullData } from "../../interfaces";

function Home({
  homeSongs,
  mixSongs,
}: {
  homeSongs: CarouselData[];
  mixSongs: SongFullData[];
}) {
  const [filter, setFilter] = useState<boolean | string>(false);
  const [filteredSongs, setFilteredSongs] = useState<CarouselData[]>([]);

  useEffect(() => {
    if (filter) {
      setFilteredSongs(
        homeSongs.filter((item: CarouselData) => filter === item.artist)
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
      {filteredSongs.map((item: CarouselData) => {
        return (
          <Carousel
            name={item.artist}
            type={"home"}
            key={item.artist}
            data={item}
          />
        );
      })}
    </div>
  );
}

export default Home;
